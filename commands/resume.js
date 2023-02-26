const { exec } = require('child_process')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('resumes the current song')
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");

        queue.setPause(false);
        await interaction.reply("music has been resumed, use /pause to pause the music");
    }
}