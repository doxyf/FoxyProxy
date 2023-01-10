module.exports.descripton   = "Basic help menu";
module.exports.usage        = "help"
module.exports.aliases      = ["?", "commands"];

const fs = require('fs');
const chat = require('../modules/chat.js');
const config = require('../config.json');

module.exports.send = function (client, args){
    let cmdlist = fs.readdirSync(`${__dirname}`).map(n => n.slice(0, -3));

    if(args) {
        if(!cmdlist.includes(args.toLowerCase())) return chat.proxyMsg(client, `§cNo help for "${args}".`);

        let commandModule = require(`./${args.toLowerCase()}.js`);
        chat.proxyMsgRaw(client, 
`§m-------------------§r [FoxyProxy] §m--------------------§r
Command help for §a${args}§r:
Description: §6${commandModule.descripton}§r
Usage: §6${config.globalPrefix}${commandModule.usage}§r
Aliases: §6${commandModule.aliases.join(', ')}§r
§m---------------------------------------------------§r`
        )
    }
    else {
        let cmdlist = fs.readdirSync(`${__dirname}`).map(n => n.slice(0, -3));
        chat.proxyMsg(client, `§aAvailable commands:§r ${cmdlist.join(', ')}`);
    }
}