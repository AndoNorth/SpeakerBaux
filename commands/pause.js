const { exec } = require('child_process')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('pauses the current song')
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");

        queue.setPause(true);
        await interaction.reply("music has been paused, use /resume to resume the music");
    }
}