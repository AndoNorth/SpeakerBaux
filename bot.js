require('dotenv').config()

const {Client, Events, GatewayIntentBits} = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    
});

client.once(Events.ClientReady, () =>{
    console.log(`logged in as ${client.user.tag}!`)
})

client.on(Events.MessageCreate, msg => {
    if(msg.content === 'ping'){
        msg.reply('pong')
    }
});

client.login(process.env.BOT_TOKEN)