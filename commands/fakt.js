const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const rp = require("request-promise")
const db = require('quick.db')

module.exports = {
  name: 'fakt',
  description: 'Losowy fakt',
  args: true,
  execute(message, args) {
    message.delete();
    let facturi = "https://uselessfacts.jsph.pl/random.json?language=en";
    rp(facturi).then(async function(body) {
      let factCount = await db.get("facts.count");
      body = JSON.parse(body);
      message.channel.send("```" + factCount + ". " + body.text + "```")
      db.add("facts.count", 1)
    }).catch(function(err) {
      message.channel.send("Wysyłasz wiadomości za szybko!").then(newMessage => newMessage.delete({ timeout: 5000 }).catch(function(err) {
        client.channels.cache.get(`774241128454029353`).send(`ERR: ${err}`)
      }))
    })
  },
};