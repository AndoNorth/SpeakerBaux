// setup .env
require('dotenv').config()

const { exec } = require('child_process')
const {SlashCommandBuilder, Discord} = require('discord.js')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('play-audio')
    .setDescription('plays template audio'),
    async execute(interaction) {
        if(!interaction.member.voice.channel){
            interaction.reply('you must be in a voice channel');
            return;
        }
        interaction.channel.send(`command run by ${interaction.user.username}, from voice channel ${interaction.member.voice.channel}`)
        interaction.channel.send(`attempting to join ${interaction.member.voice.channel}`)
        const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
        const player = createAudioPlayer();

        const filePath = process.env.MUSIC_FILEPATH;
        const resource = createAudioResource(filePath);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });

        player.once(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing!');
            interaction.channel.send(`playing "${filePath.split("\\").pop()}"`);
        });

        player.on('error', error => {
            console.error(`Error: ${error.message} with resource`)
        });

        player.play(resource);
        const subscription = connection.subscribe(player);
        // automatically stop after 15 secs
        // if(subscription){
        //     setTimeout(() => subscription.unsubscribe(), 15_000);
        // }
    }
}