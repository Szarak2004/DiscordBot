const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const db = require('quick.db')

module.exports = {
  name: 'usuńwarn',
  description: 'Usuwanie warnów',
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
        return message.channel.send(
          "Użycie: !usuńwarn @oznaczenie <numer warna z komendy !pokażwarn>"
        ); //tutaj zmień prefix!
      }

      //sprawdzanie czy oznaczony został bot
      if (user.user.bot) {
        return message.channel.send("Boty nie mogą mieć warnów!");
      }

      if (message.author.id === user.id && !message.member.id == 384308661305999371) {
        return message.channel.send("Nie możesz usuwać swoich warnów!");
      }

      let warningCount = db.get(
        `warnings_${message.guild.id}_${user.id}.warnCount`
      );

      if (warningCount === null) {
        return message.channel.send(
          `Użytkownik **${
          message.mentions.users.first().username
          }** nie posiada żadnych warnów!`
        );
      }

      let warnNumber = args.slice(1);
      warnNumber = Number(warnNumber);

      if (!warnNumber) {
        return message.channel.send(
          "Użycie: !usuńwarn @oznaczenie <numer warna z komendy !pokażwarn>"
        );
      }

      if (warnNumber <= 0 || warnNumber > 5) {
        return message.channel.send(
          "Użycie: !usuńwarn @oznaczenie <numer warna z komendy !pokażwarn>"
        );
      }

      warnNumber--;

      let warningsArray = db.get(`warnings_${message.guild.id}_${user.id}.warns`);
      let warnReason = warningsArray[warnNumber];
      warningsArray.splice(warnNumber, 1);
      db.set(`warnings_${message.guild.id}_${user.id}.warns`, warningsArray);
      db.subtract(`warnings_${message.guild.id}_${user.id}.warnCount`, 1);
      return message.channel.send(
        `Usunięto warna:\n**${warnReason}**\nużytkownikowi **${
        message.mentions.users.first().username
        }**!`
      );
  },
};