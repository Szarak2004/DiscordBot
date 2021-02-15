const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

require("dotenv").config();
const token = process.env.token;
const prefix = process.env.prefix;
const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
client.commands = new Discord.Collection();
const db = require('quick.db')
const fs = require('fs');
var helpmsg = "";

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log("✌️ Loaded: " + command.name + " ☺️")
  client.commands.set(command.name, command);
  helpmsg += "!" + command.name + " - " + command.description + "\n"
}
console.log(`✌️ Załadowano ${commandFiles.length} komend! ✌️`)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("olimpiadzie wiedzy o Afryce", {
    type: "COMPETING",
    url: "https://stats.uptimerobot.com/lDgRRUoqNX"
  });
  // Making sure Fact's current number in the database isn't 0
  let factCount = async function() {
    await db.get("facts.count")
  }
  if (factCount == 0 || factCount == null) {
    db.set("facts.count", 1)
  }

  fs.writeFileSync('./commands/helpmsg.txt', helpmsg, 'utf-8');
  console.log("Help message saved!\n")

})

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    console.log(`${message.author.username}: ${message.content} `)
    console.log("/////////////////////////////////////////////////////////////")
    if(message.content.includes(("debil")) && !message.author.bot) {
      message.channel.send("<:debil:807203983584264192>");
    }
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) {
    return;
  };
  client.commands.get(command).execute(message, args);

});

client.login(token);