const config = require('../config.json');
const registry = require('prismarine-registry')(config.version)
const ChatMessage = require('prismarine-chat')(registry)

module.exports.parseConsole = function (chatJson){
    const msg = new ChatMessage(chatJson);
    return msg.toAnsi();
};

module.exports.parseRaw = function (chatJson){
    const msg = new ChatMessage(chatJson);
    return msg.toString();
};