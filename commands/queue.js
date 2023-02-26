const { exec } = require('child_process')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('displays the current songs in queue')
    .addNumberOption((option) => option.setName('page').setDescription('page number of the queue').setMinValue(1))
    ,
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return await interaction.reply("there are no songs in the queue");
        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
        const page = (interaction.options.getNumber('page') || 1) - 1; // -1 since arrays index from 0

        if(page > totalPages) return await interaction.reply(`invalid page. there are only a total of ${totalPages} pages`);

        const SONGS_PER_PAGE = 10;
        const queueString = queue.tracks.slice(page * SONGS_PER_PAGE, page*SONGS_PER_PAGE + SONGS_PER_PAGE).map((song, i) => {
            return `**${page * SONGS_PER_PAGE + i + 1}. \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n");

        const currentSong = queue.current;

        await interaction.reply({
            embeds: [ new EmbedBuilder()
                .setDescription(`**Currently Playing\n` +
                (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}` : "None") +
                `\n\n**Queue\n${queueString}`
                )
                .setFooter({
                    text: `page ${page +1} of ${totalPages}`
                })
                .setThumbnail(currentSong.thumbnail)
            ]
        });
    }
}