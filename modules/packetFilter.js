const config = require('../config.json');
const chat = require('./chat.js');

module.exports.packetFilterFromClient = function(data, meta, targetClient, client){
    let result;

    switch (meta.name) {
        case 'chat':
            if(data.message.startsWith(config.globalPrefix) && data.message.toLowerCase() != config.globalPrefix.toLowerCase()) result = false
            else result = true;
            break;

        default:
            result = true;
            break;
    };

    return result;
};

module.exports.packetFilterFromServer = function(data, meta, targetClient, client){
    let result;

    switch (meta.name) {

        case 'world_particles':
            if(data?.particles > 1_000) {
                chat.proxyMsg(client, "§cWARNING: Filtered packet with huge amount of particles that might result crashing the client if rendered.");
                result = false;
            }
            else result = true;
            break;

        default:
            result = true;
            break;
    };

    return result;
};