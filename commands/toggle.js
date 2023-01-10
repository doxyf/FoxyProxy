module.exports.descripton   = "Toggles a FoxyProxy function.";
module.exports.usage        = "toggle <f>";
module.exports.aliases      = ["(none)"];

const chat = require('../modules/chat.js');

module.exports.toggle = function (targetClient, client, args){
    if(!args) return chat.proxyMsg(client, '§4No function defined.');

    switch(args.toLowerCase()){
        case 'vanish':
        case 'v':
        case 'auto_vanish':
        case 'autovanish':
            client.auto_vanish = !client.auto_vanish;
            chat.proxyMsg(client, `§aFunction "Auto vanish" is now set to §6${client.auto_vanish}§a.`);
            break;

        case 'op':
        case 'autoop':
        case 'auto_op':
            client.auto_op = !client.auto_op;
            chat.proxyMsg(client, `§aFunction "Auto OP" is now set to §6${client.auto_op}§a.`);
            break;

        case 'creative':
        case 'autocreative':
        case 'auto_creative':
            client.auto_creative = !client.auto_creative;
            chat.proxyMsg(client, `§aFunction "Auto creative" is now set to §6${client.auto_creative}§a.`);
            break;

        case 'commandspy':
        case 'auto_commandspy':
        case 'auto_spy':
        case 'autospy':
            client.auto_commandspy = !client.auto_commandspy;
            chat.proxyMsg(client, `§aFunction "Auto command spy" is now set to §6${client.auto_commandspy}§a.`);
            break;

        case 'auto_unmute':
        case 'unmute':
            client.auto_unmute = !client.auto_unmute;
            chat.proxyMsg(client, `§aFunction "Auto unmute" is now set to §6${client.auto_unmute}§a.`);
            break;

        default:
            chat.proxyMsg(client, `§cFunction "§4${args}§c" does not exist!`);
            break;
    }
}