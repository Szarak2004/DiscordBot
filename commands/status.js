const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const status = require('minecraft-server-status');

module.exports = {
  name: 'status',
  description: 'Status serwera Minecraft',
  args: true,
  execute(message, args) {
    status('serwervlo.ddns.net', 25565, res => {
      message.channel.send(`
      Online: ${res.online}
      Liczba graczy: ${res.players.now}
      `)
    })
  },
};