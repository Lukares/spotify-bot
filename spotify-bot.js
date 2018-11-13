var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client();
bot.login(auth.token);

bot.on('ready', evt => {
    logger.info('Connected');
});

bot.on('message', async message => {
    if (!message.guild) return;
    const text = message.toString();
    const voice_id = (message.member.voiceChannelID);
    const voice_channel = message.guild.channels.get(voice_id);
    if (text.substring(0, 7) === 'spotify' && voice_channel) {
      const connection = await voice_channel.join();
    } else {
      message.reply('You need to join a voice channel first!');
    }
});