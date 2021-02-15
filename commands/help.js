const fs = require('fs');

module.exports = {
  name: 'help',
  description: 'Informacje o komendach',
  args: true,
  execute(message, args) {
    fs.readFile('./commands/helpmsg.txt', 'utf-8', function(err, data) {
      if (err) throw err;
      message.channel.send("```" + data + "```")
    })
  }
}