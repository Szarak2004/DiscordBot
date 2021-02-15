const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const db = require('quick.db')

module.exports = {
  name: 'ilośćwarn',
  description: 'Liczba warnów danej osoby',
  args: true,
  execute(message, args) {
    if (!message.member.roles.cache.has("781459696884252722")&&!message.member.id == 384308661305999371) {
      return message.channel.send(
        "Nie masz odpowiednich uprawnień, aby użyć tej komendy!"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Użycie: !ilośćwarn @oznaczenie"); //tutaj zmień prefix!
    }

    //sprawdzanie czy oznaczony został bot
    if (user.user.bot) {
      return message.channel.send("Boty nie mogą mieć warnów!");
    }


    let warningArray = db.get(`warnings_${message.guild.id}_${user.id}.warns`);
    //sprawdzanie czy użytkownik ma jakieś warny
    if (warningArray === undefined || warningArray === null) {
      return message.channel.send(
        `Użytkownik **${
        message.mentions.users.first().username
        }** nie posiada żadnych warnów!`
      );
      //jeśli ma 1 warn
    } else {
      let warnings = warningArray.length;
      if (warnings === 0) {
        return message.channel.send(
          `Użytkownik **${
          message.mentions.users.first().username
          }** nie posiada żadnych warnów!`
        );
      }
      if (warnings === 1) {
        return message.channel.send(
          `Użytkownik **${
          message.mentions.users.first().username
          }** posiada 1 warn!`
        );
        //jeśli ma więcej warnów
      }
      if (warnings === 5) {
        return message.channel.send(
          `Użytkownik **${
          message.mentions.users.first().username
          }** posiada 5 warnów!`
        );
        //jeśli ma więcej warnów
      } else
        return message.channel.send(
          `Użytkownik **${
          message.mentions.users.first().username
          }** posiada **${warnings}** warny!`
        );
    }
  },
};