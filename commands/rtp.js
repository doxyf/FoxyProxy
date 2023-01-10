module.exports.descripton   = "Random teleports you";
module.exports.usage        = "rtp";
module.exports.aliases      = ["tpr"];

const chat = require('../modules/chat.js');

module.exports.rtp = function (targetClient, client){
    let x = Math.floor(Math.random() * 30_000_00);
    let z = Math.floor(Math.random() * 30_000_00);

    chat.say(targetClient, `/tp ${x} 100 ${z}`);
    chat.proxyMsg(client, `Teleporting you to §a${x} 100 ${z}§r.`);
}