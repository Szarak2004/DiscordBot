const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const { Uwuifier } = require('uwuifier')
const uwuifier = new Uwuifier({
  spaces: {
    faces: 0.25,
    actions: 0,
    stutters: 0.1
  },
  words: 1,
  exclamations: 1
});

module.exports = {
  name: 'uwu',
  description: 'Uwu',
  args: true,
  execute(message, args) {
      message.delete();
      const uwusentence = args.join(" ");
      if (uwusentence === "" || uwusentence === " ") {
        message.channel.send("Użycie: !uwu [zdanie]")
        return;
      }
      message.channel.send(uwuifier.uwuifySentence(uwusentence))
  },
};