const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
var NoiseMap = require('noise-map');
const { createCanvas, loadImage } = require('canvas')

module.exports = {
  name: 'mapa',
  description: 'Generator losowej mapy',
  args: true,
  execute(message, args) {
      message.delete();
      var generator = new NoiseMap.MapGenerator();
      var heightmap = generator.createMap(400, 200, { type: 'perlin' });
      const canvas = createCanvas(800, 400)
      const context = canvas.getContext('2d')
      heightmap.draw(context, 800, 400, NoiseMap.STYLE.REALISTIC);
      const buffer = canvas.toBuffer('image/png')
      const attachment = new MessageAttachment(buffer);
      message.channel.send(attachment);
      return;
  },
};