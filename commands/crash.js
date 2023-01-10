module.exports.descripton   = "Tries to crash a player.";
module.exports.usage        = "crash <name>";
module.exports.aliases      = ["(none)"];

const chat = require('../modules/chat.js');
const { cb_nospy } = require('./antispy.js');

module.exports.pcrash = function (client, targetClient, args){
    if(!args) return chat.proxyMsg(client, '§cDefine player username.§r');

    cb_nospy(client, targetClient, `say EXPLOIT REMOVED FROM PUBLIC REPOSITORY. IT WON'T WORK FOR YOU!`);
    chat.proxyMsg(client, `§aTrying to crash ${args}...§r`);
}