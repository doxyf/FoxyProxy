module.exports.descripton   = "Evaluate JavaScript code.";
module.exports.usage        = "eval <raw JS code>";
module.exports.aliases      = ["(none)"];

const chat = require('../modules/chat.js');

module.exports.meval = function (client, args){
    if(!args) return chat.proxyMsg(client, '§cMore arguments needed.§r');

    try {
        eval(args);
        chat.proxyMsg(client, '§aSuccess§r');
    } catch (e) {
        chat.proxyMsg(client, '§4Failed§r');
        chat.proxyMsgRaw(client, e.toString());
    }
}