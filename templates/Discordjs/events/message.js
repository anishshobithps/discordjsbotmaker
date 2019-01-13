/**
 * Author: Anish Shobith
 * Event: message
 */

const config = require("../config");

module.exports = async (bot, message) => {

    if(message.author.bot) return;
  
    let prefix = false
    for (const Prefix of [`${bot.user} `,`${config.prefix}`]) {
         if (message.content.startsWith(Prefix)) prefix = Prefix
    }
    if (!prefix) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if(!message.content.startsWith(prefix)) return;

    if(command) {
        if(message.author.id !== config.owner && !command.conf.enabled) return message.channel.send(`Sorry ${message.author.username} the command has been disbaled!`)

        if(command.conf.onweronly) return message.channel.send(`Sorry ${message.author.username} this command is owner only!!`)
        
        if(!message.guild && command.conf.guildonly)
        return message.channel.send(`This command is unavaiable via private message. Please run this command in a guild.`);
        
    }

    try {
        command.run(bot, message, args);
    }
    catch (e) {
        return;
    }
};