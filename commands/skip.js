const { exec } = require('child_process')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('skips the current song')
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");

        const currentSong = queue.current;

        queue.skip();
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${currentSong.title} has been skipped`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        });
    }
}