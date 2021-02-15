const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

const fizres = ["Nie licz na to.",
  "Moja odpowiedź brzmi nie.",
  "Według moich źródeł - nie.",
  "Z mojej perspektywy - niezbyt.",
  "Bardzo wątpliwe.",
  "Na 100% nie.",
  "W podstawówce? Tak. Z normalnym nauczycielem? Tak. W zwykłym liceum? Tak. Z Janiną Kulą? Niezbyt...",
  "Nawet gdybym chciał to i tak nie będzie fajna.",
  "Raczej nie.",
  "Oczywiście, że nie.",
  "Niestety moja odpowiedź brzmi: nie."];

module.exports = {
  name: 'fizyka?',
  description: 'Czy fizyka jest fajna?',
  args: true,
  execute(message, args) {
    const returnmessage = fizres[Math.floor(Math.random() * fizres.length)];
    message.channel.send(returnmessage).catch(function(err) {
      client.channels.cache.get(`774241128454029353`).send(`ERR: ${err}`)
    })
  },
};