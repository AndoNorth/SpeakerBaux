const { exec } = require('child_process')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('quit')
    .setDescription('stops the bot and clears the queue')
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");

        queue.destroy();
        await interaction.reply("bye");
    }
}