const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const db = require('quick.db')

module.exports = {
  name: 'warn',
  description: 'Warnowanie',
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
        return message.channel.send("Użycie: !warn @oznaczenie <powód>"); //tutaj zmień prefix!
      }

      //sprawdzanie czy oznaczony został bot
      if (user.user.bot) {
        return message.channel.send("Nie możesz dodać warna botowi!");
      }

      const reason = args.slice(1).join(" ").toString();

      //sprawdzenie czy dodany jest powód
      if (!reason) {
        return message.channel.send("Użycie: !warn @oznaczenie <powód>"); //tutaj też zmień prefix
      }

      //warny w quick.db
      let warningCount = db.get(
        `warnings_${message.guild.id}_${user.id}.warnCount`
      );
      let warnings = db.get(`warnings_${message.guild.id}_${user.id}.warns`);

      if (warningCount === 5) {
        return message.channel.send(
          `${message.mentions.users.first().username} osiągnął/nęła już 5 warnów!`
        );
      }

      //dodanie warna
      if (warningCount === null) {
        db.push(`warnings_${message.guild.id}_${user.id}.warns`, reason);
        db.set(`warnings_${message.guild.id}_${user.id}.warnCount`, 1);
        user.send(
          `Dostałeś warna na serwerze **${message.guild.name}** za ${reason}!`
        );
        message.channel.send(
          `Dodano warna użytkownikowi **${
          message.mentions.users.first().username
          }** za ${reason}`
        );
      } else if (warningCount !== null) {
        db.push(`warnings_${message.guild.id}_${user.id}.warns`, reason);
        db.set(
          `warnings_${message.guild.id}_${user.id}.warnCount`,
          warnings.length
        );
        user.send(
          `Dostałeś warna na serwerze **${message.guild.name}** za ${reason}`
        );
        message.channel.send(
          `Dodałeś warna użytkownikowi **${
          message.mentions.users.first().username
          }** za ${reason}`
        );
      }
  },
};