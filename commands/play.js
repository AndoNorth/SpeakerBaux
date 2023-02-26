const { exec } = require('child_process')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { QueryType } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('load song from youtube')
    .addSubcommand((subcommand) =>
        subcommand
            .setName("song")
            .setDescription("load a song from url")
            .addStringOption((option) =>
                option.setName("url").setDescription("the song's url").setRequired(true))
    ),
    async execute(client, interaction) {
        if(!interaction.member.voice.channel) return interaction.editReply('you must be in a voice channel');

        const queue = await client.player.createQueue(interaction.guild);
        if(!queue.connection) await queue.connect(interaction.member.voice.channel)

        let embed = new EmbedBuilder();

        let url = interaction.options.getString('url');

        const results = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_VIDEO,
        });
        if(results.tracks.length === 0) return interaction.reply("no results");

        const song = results.tracks[0];
        await queue.addTrack(song)
        embed
            .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
            .setThumbnail(song.thumbnail)
            .setFooter({text: `Duration: ${song.duration}`})
        if(!queue.playing) await queue.play()
        await interaction.reply({
            embeds: [embed]
        })
    }
}