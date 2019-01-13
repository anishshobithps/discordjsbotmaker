/**
 * Author: Anish Shobith
 * Command name: Help Command!!
 */

const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
    
    run: async (bot, message, args) => {

    let prefix = config.prefix;
    let module = bot.helps.array();
   
    if(!args[0]) {
        
        const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setAuthor(bot.user.username + " Category List", bot.user.displayAvatarURL)
        .setDescription(`\nTo check the command usage, type \`${prefix}help <commands>\`\n`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        for(let mod of module) {
        embed.addField(`**${mod.name} commands:**`, mod.cmds.map(x => `\`${x}\``).join(" "))
        }
        message.channel.send(embed);
}
else {
        let cmd = args[0];
        if (bot.commands.has(cmd) || bot.commands.get(bot.aliases.get(cmd))) {
          let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
          let name = `${command.help.name}`;
          let desc = command.help.description;
          let aliases = command.help.aliases;
    
          let embed = new Discord.MessageEmbed() 
          .setTitle(`Command: ${name}`) 
          .addField('Description', desc)
          .addField('Aliases', aliases[0] ? `${aliases.join(`, `)}` : `-`)
          .setFooter(`Hooks such as [] or <> are not to be used when using commands.`) 
          .setColor(0x36393e) 
          return message.channel.send(embed);  
        }
    }   
},

    conf: {
        owneronly: false,
        enabled: true,
        guildonly: false

    },

    help: {
        name: "help",
        aliases: ["h", "commands"],
        description: "Shows bot commands"

    }
};