/*
 FoxyProxy for 1.15.2! use at your own risk and read https://github.com/doxyf/FoxyProxy
 Do NOT publish parts and/or modified versions of this project without crediting my GitHub (doxyf) or Discord (Foxy#8956).
 Inspired by luna's old kaboom proxy I found on my pc for some reason.
*/

const mc = require('minecraft-protocol')
const config = require('./config.json');
const {packetFilterFromClient, packetFilterFromServer} = require('./modules/packetFilter.js');
const {PR, TCPR} = require('./modules/packetRouter.js');

const states = mc.states

const srv = mc.createServer({
    'online-mode': config['online-mode'],
    port: config.local_port,
    keepAlive: false,
    version: config.version,
    motd: config.motd
});

console.log(`Ready to proxy ${config.host}:${config.remote_port}. Join localhost:${config.local_port} for proxied connection.`)

srv.on('login', function (client) {

    const targetClient = mc.createClient({
      host: config.host,
      port: config.remote_port,
      username: client.username,
      keepAlive: false,
      version: config.version
    });

    Object.assign(client, config.kaboom);
    client.playerlist = {};
    
    client.on('packet', function (data, meta) { //from client to server
        if (targetClient.state === states.PLAY && meta.state === states.PLAY) {

            PR(data, meta, targetClient, client);

            if(!packetFilterFromClient(data, meta, targetClient, client)) return;

            targetClient.write(meta.name, data);
        };
    });

    targetClient.on('packet', function (data, meta) { //from server to client
        if (meta.state === states.PLAY && client.state === states.PLAY) {

            TCPR(data, meta, targetClient, client);

            if(!packetFilterFromServer(data, meta, targetClient, client)) return;
            
            client.write(meta.name, data);
        };
    });

    client.on('end', (reason) => {
        console.log(reason);
        console.log('client emmited end => targetClient.end')
        targetClient.end(`[FoxyProxy] Killed targetClients: ${reason}`);
    });

    targetClient.on('end', (reason) => {
        console.log(reason);
        console.log('targetClient emmited end => client.end')
        client.end(`[FoxyProxy] Killed clients: ${reason}`);
    });

    module.exports = {client, targetClient};
});