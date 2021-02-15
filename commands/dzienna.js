const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const rp = require("request-promise")

module.exports = {
  name: 'dzienna',
  description: 'Dzienna ilość zakarzeń',
  args: true,
  execute(message, args) {
    message.delete();
    let dailyuri = "https://coronavirus-19-api.herokuapp.com/countries/Poland"
    rp(dailyuri).then(async function(body) {
      body = await JSON.parse(body);
      message.channel.send("Liczba dzisiejszych zakażeń: " + body.todayCases)
    }).catch(function(err) {
      client.channels.cache.get(`774241128454029353`).send(`ERR: ${err}`)
    })
  },
};