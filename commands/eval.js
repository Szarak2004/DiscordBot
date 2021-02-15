const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const { inspect } = require('util');
const fs = require('fs');
const sleep = require('system-sleep');

module.exports = {
  name: 'eval',
  description: 'Komenda do testowania',
  args: true,
  execute(message, args) {
    if (message.author.id !== '384308661305999371') return message.channel.send("Nie masz permisji aby użyć tej komendy");

    let evaled;
    try {
      evaled = eval(args.join(' '))
      message.channel.send(inspect(evaled));
    }
    catch (error) {
      message.reply('there was an error during evaluation: ' + error);
    }
  }
}