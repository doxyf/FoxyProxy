module.exports.descripton   = "Show info about player";
module.exports.usage        = "about <username>";
module.exports.aliases      = ["profile", "whois", "who","gdo"]; // se ptal

const chat = require('../modules/chat.js');

module.exports.about = function (client, args){
    if(!args) return chat.proxyMsg(client, '§cMore arguments needed.§r');

    let profile = Object.keys(client.playerlist).find(element => client.playerlist[element].name.toLowerCase() == args.toLowerCase());
    if(!profile) return chat.proxyMsg(client, `§cUser ${args} not found.§r`);

    chat.proxyMsgRaw(client,

`§m------------------§r [About player] §m-------------------§r
Username: §6${client.playerlist[profile].name}§r
UUID: §6${profile}§r
Gamemode: §6${client.playerlist[profile].gamemode}§r
Activity: §6${client.playerlist[profile].activity}§r
Ping: §6${client.playerlist[profile].ping}§r
§m--------------------------------------------------§r`

);

}