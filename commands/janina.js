const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

module.exports = {
  name: 'janina',
  description: 'JANINA',
  args: true,
  execute(message, args) {
    message.delete()
    message.channel.send('', {
            files: [
                "./janina.png"
            ]
        });
  }}