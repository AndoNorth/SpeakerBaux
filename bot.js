// setup .env
require('dotenv').config()

const {Client, Events, GatewayIntentBits, Collection} = require('discord.js')
// setup bot intent
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    
})
// setup commands
const fs = require('node:fs')
const path = require('node:path')

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// initialize the events
client.once(Events.ClientReady, () =>{
    console.log(`logged in as ${client.user.tag}!`);
})

client.on(Events.MessageCreate, msg => {
    if(msg.content === 'ping'){
        msg.reply('pong');
    }
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// start bot
client.login(process.env.BOT_TOKEN)