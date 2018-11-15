var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const ytdl = require('ytdl-core');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token);

bot.on('ready', evt => {
    logger.info('Initialized.');
});

bot.on('message', async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  console.log(message);
  const voice_id = (message.member.voiceChannelID);
  const voice_channel = message.guild.channels.get(voice_id);
  const streamOptions = {seek: 0, volume: 1};
  const stream = ytdl('https://www.youtube.com/watch?v=FyASdjZE0R0', {filter: 'audioonly'});

  if (message.content.substring(0, 7) === 'spotify' && voice_channel) {
    voice_channel.join().then(connection => {
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on('finish', () => {
            console.log('Finished playing!');
            dispatcher.destroy();
        });
    });
  } else {
      message.reply('You need to be in a voice channel first!');
  }
});
