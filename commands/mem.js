const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const rp = require("request-promise")
const { meme } = require('memejs')

module.exports = {
  name: 'mem',
  description: 'Losowy mem z reddita',
  args: true,
  execute(message, args) {
      message.delete();
      meme(async function(err, data) {
        if (err) return console.log(err);
        let sendurl = data.url;
        message.channel.send(sendurl)
      });
  },
};