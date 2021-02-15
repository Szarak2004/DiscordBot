const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

module.exports = {
  name: 'halo',
  description: 'Najlepszy mem',
  args: true,
  execute(message, args) {
    message.delete();
    var voiceChannel = message.member.voice.channel;
    const emojis = "<:KulaHeil:" + message.guild.emojis.cache.find(emoji => emoji.name == 'KulaHeil') + "> <:halohalo:" + message.guild.emojis.cache.find(emoji => emoji.name == 'halohalo') + ">";
    if (!voiceChannel) return message.channel.send("No ale na vc musi być ta komenda... " + emojis)
    voiceChannel.join().then(connection => {
      const dispatcher = connection.play('./halo.mp3');
      dispatcher.on("finish", end => {
        voiceChannel.leave();
      });
    }).catch(err => console.log(err));
  }
}