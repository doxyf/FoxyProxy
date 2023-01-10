module.exports.descripton   = "Execute command with commandspy bypass.";
module.exports.usage        = "antispy <command>";
module.exports.aliases      = ["nospy"];

const chat = require('../modules/chat.js');

module.exports.cb_nospy = function (client, targetClient, args){
    if(!args) return chat.proxyMsg(client, '§cMore arguments needed.§r');

    const x = Math.floor(client.pos.x);
    const z = Math.floor(client.pos.z);

    chat.say(targetClient, `/setblock ${x} 0 ${z} minecraft:command_block{CustomName:'{"text": "FPXCB"}'} destroy`); //FoxyProXyCommandBlock

    setTimeout(() => {
        targetClient.write('update_command_block', {location: { x: x, y: 0, z: z }, command: args, mode: 2, flags: 5});
    }, 500);
}