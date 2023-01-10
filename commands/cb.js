module.exports.descripton   = "Execute command as command block.";
module.exports.usage        = "cb <command>";
module.exports.aliases      = ["commandblock, cmd, cblock"];

const chat = require('../modules/chat.js');

module.exports.cbexec = function (client, targetClient, args){
    if(!args) return chat.proxyMsg(client, '§cMore arguments needed.§r');

    chat.say(targetClient, `/setblock ~ 0 ~ minecraft:command_block{Command:"${args.replace(/"/g, '\\"')}", auto:1, CustomName:'{"text": "FPXCB"}'} destroy`);
    chat.proxyMsg(client, '§aSuccess§r');
}