module.exports.descripton   = "Use HBot's trusted commands automatically";
module.exports.usage        = "hval #<command + args>";
module.exports.aliases      = ["h, hbot"];

const crypto = require('crypto');
const config = require('../config.json');

const chat = require('../modules/chat.js');

module.exports.hval = function (client, targetClient, args){
    if(!args) return chat.proxyMsg(client, '§cMore arguments needed.§r');

    const sha256 = crypto.createHash('sha256');
    const time = Math.floor(+new Date() / 10000);
    const raw = `${args.replace(/&[0-9a-fklmnor]/g, '')};${targetClient.uuid};${time};${config.kaboom.hbot_key}`;
    sha256.update(raw);
    const hash = sha256.digest();
    const big_int = hash.slice(0, 4).readUInt32BE().toString(36); //final hash
    console.log(raw)

    chat.say(targetClient, `${args} ${big_int}`);
}