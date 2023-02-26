const { exec } = require('child_process')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('skips to certain track no.')
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription('the track to skip to').setMinValue(1).setRequired(true))
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");

        const trackNum = interaction.options.getNumber('tracknumber');
        if(trackNum > queue.tracks.length) return await interaction.reply('invalid track number');
        queue.skipTo(trackNum - 1);

        await interaction.reply(`skipped ahead to track number ${trackNum}`);
    }
}