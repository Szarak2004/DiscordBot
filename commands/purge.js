const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

module.exports = {
  name: 'purge',
  description: 'Usuwanie wielu wiadomości naraz',
  args: true,
  execute(message, args) {
      if ((!message.member.hasPermission('MANAGE_MESSAGES')) || message.author.id !== '384308661305999371'){
        message.channel.send("Nie masz permisji aby użyć tej komendy!").then(newMessage => newMessage.delete({ timeout: 5000 }).catch(function(err) {
          client.channels.cache.get(`774241128454029353`).send(`ERR: ${err}`)
        }))
        return;
      }
      let numcheck = parseInt(args.join("")) + 1
      if (numcheck == "" || !Number.isInteger(numcheck) || numcheck < 0 || numcheck > 99) {
        message.channel.send("Użycie: !purge [1-100]").then(newMessage => newMessage.delete({ timeout: 5000 }).catch(function(err) {
          console.log(err)
          client.channels.cache.find(x => x.id == "774241128454029353").send(`ERR: ${err}`)
        }))
        return;
      }
      message.channel.bulkDelete(numcheck)
      console.log(message.member.user.tag + " purged " + (numcheck-1) + " messages in " + message.channel.name)
  },
};