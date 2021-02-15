const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const binary = require("decode-encode-binary")

module.exports = {
  name: 'tekstnabinarny',
  description: 'Konwerter tekst na binarny',
  args: true,
  execute(message, args) {
      message.delete();
      const texttoconv = args.join(" ");
      if (texttoconv === "" || texttoconv === " ") {
        message.channel.send("Użycie: !tekstnabinarny [zdanie]")
        return;
      }
      message.channel.send(binary.encode(texttoconv))
  },
};