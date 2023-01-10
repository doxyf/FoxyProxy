var queue = [];

module.exports.proxyMsg = function (client, message){
    client.write('chat', {message: JSON.stringify({"text": `§d§l[§6§lFPRX§d§l]§r ${message}`}), position: 0});
}

module.exports.proxyMsgRaw = function (client, message){
    client.write('chat', {message: JSON.stringify({"text": message}), position: 0});
}

module.exports.say = function (client, message){
    queue.push({client: client, message: message})
    //client.write('chat', {message: message});
}

setInterval(() => {
    if(!queue[0]) return;
    queue[0].client.write('chat', {message: queue[0].message});
    queue.shift();
}, 200);