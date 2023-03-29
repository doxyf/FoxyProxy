# FoxyProxy
Minecraft proxy made for Kaboom anarchy\
Made for 1.15.2 idk about other versions, try it urself\

# Installation
All you need is Node.JS runtime and Node Package Manager (NPM) (https://nodejs.org)\
Download this project, extract it somewhere on your computer or hosting server\
Open CMD or terminal and cd to your project folder\
Type `npm i` or `npm install` and wait until NPM installs the dependencies\
Open `config.json` and set everything you want to change\
Type `node .` or `node index.js` and hit enter\

# Setup and usage
Enter the server address to the `host` part in `config.json`\
Enter the server port to the `remote_port` in `config.json`\
Enter the port you want to run the proxy to the `local_port` in `config.json`\
Connect to the proxy using direct connect or add server (enter localhost:<local_port> as server address)\
Type ?help in the chat to see more info about using the proxy ingame (or replace "?" with your custom prefix in config.json)\

# Config
- globalPrefix - This is the prefix to control the proxy with Minecraft chat
- online-mode  - Put this to false if you are connecting with cracked Minecraft account
- host         - The remote server address
- remote_port  - Port of the server you want to connect
- local_port   - Port of the proxy server on your pc (it's ok to leave it as 25565, it's default Mc port)
- version      - Minecraft server version (recommended to use same version as server or 1.15.2 if server supports ViaVersion)
- motd         - The server message you see when you add address of the proxy to the server list
- loginMessage - Custom message you automatically send to the chat on every join to the server

- kaboom:auto_op         - Automatically OPs you if you get deopped
- kaboom:auto_creative   - Automatically puts you in creative
- kaboom:auto_vanish     - Automatically makes you invisible to other players on the server
- kaboom:auto_commandspy - Automatically activates commandspy everytime it get disabled
- kaboom:auto_god        - Automatically puts you in Essentials god mode
- kaboom:auto_unmute     - Automatically removes Essentials mute if you get muted
- kaboom:hbot_key        - Only for trusted players by hhhzzzsss, if you dont know what im talking about, just ignore this.
