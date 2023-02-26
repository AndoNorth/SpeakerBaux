const { exec } = require('child_process')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('shows info of current song')
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");

        let bar = queue.createProgressBar({
            queue: false,
            length: 19,
        })

        const song = queue.current;

        await interaction.reply({
            embeds: [ new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription(`currently playing [${song.title}](${song.url})\n\n` + bar)
        ],
        });
    }
}