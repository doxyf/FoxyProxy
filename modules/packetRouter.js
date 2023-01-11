const chatParser = require('./chatParser.js');
const commandManager = require('./commandManager.js');
const config = require('../config.json');

const chat = require('./chat.js');

var session_entity_id = 0;

module.exports.PR = function (data, meta, targetClient, client){ // FROM CLIENT TO SERVER
    switch (meta.name) {
        case 'chat':
            commandManager(data.message, targetClient, client);
            break;

        case 'position':
            client.pos = data;
            break;

        case 'teleport_confirm':
        case 'position_look':
        case 'update_view_position':
        case 'look':
        case 'window_items':
        case 'set_slot':
        case 'sound_effect':
        case 'keep_alive':
        case 'world_particles':
        case 'set_slot':
        case 'set_creative_slot':
        case 'arm_animation':
        case 'held_item_slot':
        case 'flying':
        case 'abilities':
            
        break;

        default:
            console.log('[C -> S]', meta.name, meta, data);
            break;
    };
};

module.exports.TCPR = function (data, meta, targetClient, client){ // FROM SERVER TO CLIENT
    switch (meta.name) {
        case 'chat':
            autoMatizer(data, targetClient, client);
            //console.log(chatParser.parseConsole(JSON.parse(data.message)));
            break;

        case 'update_light':
        case 'multi_block_change':
        case 'map_chunk':
        case 'update_time':
        case 'rel_entity_move':
        case 'block_change':
        case 'unload_chunk':
        case 'keep_alive':
        case 'teams':
        case 'tab_complete':
        case 'declare_commands':
        case 'position':
        case 'entity_velocity':
        case 'entity_move_look':
        case 'entity_head_rotation':
        case 'world_event':
        case 'entity_metadata':
        case 'entity_update_attributes':
        case 'entity_teleport':
        case 'entity_look':
        case 'entity_destroy':
        case 'spawn_entity':
        case 'spawn_entity_living':
        case 'world_particles':
        case 'abilities':
        case 'update_view_position':
        case 'set_slot':
        case 'sound_effect':
        case 'animation':
        case 'explosion':
        case 'window_items':

            break;
        
        case 'block_change':
            console.log(data);
            break;

        case 'login':
            session_entity_id = data.entityId;

            if(client.auto_op)          chat.say(targetClient, '/op @s[type=player]');
            if(client.auto_unmute)      chat.say(targetClient, `/mute ${targetClient.username} 0s`);
            if(client.auto_vanish)      chat.say(targetClient, '/v on');
            if(client.auto_creative)    chat.say(targetClient, '/gmc');
            if(client.auto_god)         chat.say(targetClient, '/god on');
            if(client.auto_commandspy)  chat.say(targetClient, '/c on');
            if(config.loginMessage)     chat.say(targetClient, config.loginMessage);
            break;

        case 'entity_status':
            if(data.entityStatus == 24 && data.entityId == session_entity_id){
                chat.proxyMsg(client, 'You are deopped!')
                if(client.auto_op) chat.say(targetClient, '/op @s[type=player]');
            }

            if(data.entityStatus == 28 && data.entityId == session_entity_id){
                chat.proxyMsg(client, 'You are opped!');
            }
            break;

        case 'game_state_change':
            if(data.gameMode != 1 && client.auto_creative) chat.say(targetClient, '/gmc');
            break;

        case 'player_info':

            client.playerlist[data.data[0].UUID] = 
            {
                "name": data.data[0].name || client.playerlist[data.data[0].UUID]?.name || null,
                "gamemode": data.data[0].gamemode || client.playerlist[data.data[0].UUID]?.gamemode || null,
                "activity": "online",
                "ping": data.data[0].ping || client.playerlist[data.data[0].UUID]?.ping || 0,
            }

            if(data.action == 4 && client.playerlist[data.data[0].UUID]) client.playerlist[data.data[0].UUID].activity = "offline or vanish"

            break;

        default:
            console.log('[S -> C]', meta.name, meta, data);
            break;
    };
};

function autoMatizer(data, targetClient, client){
    let message = chatParser.parseRaw(JSON.parse(data.message));

    if(message == "You have been muted for now.") return;
    if(message.startsWith("You have been muted") && client.auto_unmute) chat.say(targetClient, `/mute ${targetClient.username} 0s`);

    switch (message) {
        case `Vanish for ${targetClient.username}: disabled`:
                if(client.auto_vanish) chat.say(targetClient, '/v on');
            break;

        case "Successfully disabled CommandSpy":
            if(client.auto_commandspy) chat.say(targetClient, '/c on');
            break;

        case "God mode disabled.":
            if(client.auto_god) chat.say(targetClient, '/god on');
            break;

        case "Your voice has been silenced!":
            if(client.auto_unmute) chat.say(targetClient, `/mute ${targetClient.username} 0s`);
            break;
    }
}
