const config = require("../config");

module.exports = async (bot, message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

   const prefix = config.prefix;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command;

    if(bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if(bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd))
    }

    if(!message.content.startsWith(prefix)) return;

    if(command) {
        if(message.author.id !== config.owner && !command.help.enabled) return message.channel.send(`Sorry ${message.author.username} the command has been disbaled!`)

        if(message.author.id !== config.owner && !command.help.onweronly) return message.channel.send(`Sorry ${message.author.username} this command is owner only!!`)
    }

    try {
        command.run(bot, message, args);
    }
    catch (e) {
        return;
    }
};