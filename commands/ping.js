const { exec } = require('child_process')
const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong'),
    async execute(client, interaction) {
        await interaction.reply('pong');
    }
}