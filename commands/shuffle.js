const { exec } = require('child_process')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('shuffles the queue')
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");

        queue.shuffle();
        await interaction.reply(`the queue of ${queue.tracks.length} songs have been shuffled`);
    }
}