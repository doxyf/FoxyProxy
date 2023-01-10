const config    = require('../config.json');
const chat      = require('./chat.js');

const help      = require('../commands/help.js');
const { rtp }   = require('../commands/rtp.js');
const { meval } = require('../commands/eval.js');
const {toggle } = require('../commands/toggle.js');
const {cbexec } = require('../commands/cb.js');
const {pcrash } = require('../commands/crash.js');
const {cb_nospy}= require('../commands/antispy.js');
const {about}   = require('../commands/about.js');
const {hval}    = require('../commands/hval.js');
const {packet}  = require('../commands/packet.js');

module.exports = function(incomingMessage, targetClient, client){
    if(!incomingMessage.startsWith(config.globalPrefix)) return;
    incomingMessage = incomingMessage.slice(config.globalPrefix.length);
    if(!incomingMessage || incomingMessage.length == 0) return;

    let args = incomingMessage.split(' ');
    let more_args = incomingMessage.slice(args[0].length + 1)

    switch (args[0]) {
        case 'test':
            chat.proxyMsg(client, `Up and running. Additional args: ${more_args || 'None'}`);
            break;

        case 'help':
        case '?':
        case 'commands':
            help.send(client, more_args);
            break;

        case 'rtp':
        case 'tpr':
            rtp(targetClient, client);
            break;

        case 'toggle':
            toggle(targetClient, client, more_args);
            break;

        case 'eval':
            meval(client, more_args);
            break;

        case 'cb':
        case 'commandblock':
        case 'cblock':
        case 'cmd':
            cbexec(client, targetClient, more_args);
            break;

        case 'crash':
        case 'pcrash':
        case 'crashplayer':
            pcrash(client, targetClient, more_args);
            break;

        case 'nospy':
        case 'antispy':
            cb_nospy(client, targetClient, more_args);
            break;

        case 'about':
        case 'profile':
        case 'who':
        case 'gdo':
            about(client, more_args);
            break;

        case 'hval':
        case 'h':
        case 'hbot':
            hval(client, targetClient, more_args);
            break;

        case 'p':
        case 'packet':
            packet(client, targetClient, more_args);
            break;

    
        default:
            chat.proxyMsg(client, `§cUnknown command: §4${incomingMessage}§c. Try §a${config.globalPrefix}help§c if you're §cclueless.§r`);
            break;
    }
}