module.exports = {
  name: 'informacje',
  description: 'Komenda testowa',
  args: true,
  execute(message, args) {
    if(args.length != 5) {
      return message.channel.send("Musisz podać 5 argumentów")
    }
    message.channel.send(`1. ${args[0]}\n2. ${args[1]}\n3. ${args[2]}\n4. ${args[3]}\n5. ${args[4]}
    `)
  }
}