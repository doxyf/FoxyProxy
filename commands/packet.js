module.exports.descripton   = "Send or receive fake packet.";
module.exports.usage        = "packet <s/r> <STRING packet_name> <JSON packet_data>";
module.exports.aliases      = ["p"];

const chat = require('../modules/chat.js');

module.exports.packet = function (client, targetClient, args){
    if(!args) return chat.proxyMsg(client, '§cMore arguments needed.§r');
    args = args.split(' ');
    if(args.length < 2) return chat.proxyMsg(client, '§cMore arguments needed.§r');

    let dataJson = null;

    try {
        dataJson = JSON.parse(args.join(' ').slice(args[0].length + args[1].length + 2));
    } catch (e) {
        chat.proxyMsg(client, '§cData argument is not JSON!§r');
    }

    if(!dataJson) return;

    switch (args[0].toLowerCase()) {
        case 'r':
        case 'receive':
            client.write(args[1].toLowerCase(), dataJson);
            break;

        case 's':
        case 'send':
            targetClient.write(args[1].toLowerCase(), dataJson);
            break;
    
        default:
            chat.proxyMsg(client, '§cInvalid methond. Use "s" or "r"!§r');
            break;
    }

    console.log('parsed: method:', args[0], 'name:', args[1], 'data:', dataJson);
}