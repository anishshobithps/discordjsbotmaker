const Discord = require("discord.js");
const prettyMs = require("pretty-ms");

module.exports = {

    run: async (bot, message) => {

    const embed = new Discord.MessageEmbed()
    .setTitle(`${bot.user.username}`)
    .setDescription(`A discord bot built by discordjsbotmaker package and made with by ❤️ Anish Shobith`)
    .setColor("GREEN")
    .addField("Bot ID", bot.user.id, true)
    .addField("Owner ID", bot.config.owner, true)
    .addField("Channels", bot.channels.size, true)
    .addField("Guilds", bot.guilds.size, true)
    .addField("Users", bot.users.size, true)
    .addField(`${bot.user.username} Uptime`, prettyMs(Date.now() - bot.firstLoadTime), true)
    .addField("Client Uptime", prettyMs(bot.uptime), true)
    message.channel.send(embed)

},

    conf: {
        owneronly: false,
        enabled: true,
        guildonly: false
    },

    help:  {
        name: "info",
        aliases: ["botinfo", "bf"],
        description: "Shows info about bot"
    }
};