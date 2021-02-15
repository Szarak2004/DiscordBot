const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const db = require('quick.db')

module.exports = {
  name: 'pokażwarn',
  description: 'Pokazywanie warnów danej osoby',
  args: true,
  execute(message, args) {
      if (!message.member.roles.cache.has("781459696884252722")&&!message.member.id == 384308661305999371) {
        return message.channel.send(
          "Nie masz odpowiednich uprawnień, aby użyć tej komendy!"
        );
      }

      //znalezienie osoby do warna
      const user = message.mentions.members.first();

      //sprawdzanie czy osoba istnieje
      if (!user) {
        return message.channel.send("Użycie: !pokażwarn @oznaczenie"); //tutaj zmień prefix!
      }

      //sprawdzanie czy oznaczony został bot
      if (user.user.bot) {
        return message.channel.send("Boty nie mogą mieć warnów!");
      }

      let warnings = db.get(`warnings_${message.guild.id}_${user.id}.warns`);
      if (warnings === null || warnings === undefined || warnings.length <= 0) {
        return message.channel.send(
          `Użytkownik **${
          message.mentions.users.first().username
          }** nie posiada żadnych warnów!`
        );
      } else {
        var i;
        let warningMessage = "";
        for (i = 0; i < warnings.length; i++) {
          warningMessage += i + 1 + ". " + warnings[i] + "\n";
        }
        return message.channel.send(
          `Warny użytkownika **${
          message.mentions.users.first().username
          }**: \n ${warningMessage}`
        );
      }
  },
};