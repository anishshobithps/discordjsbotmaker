/**
 * Author: Anish Shobith
 * Command: Ping
 */

module.exports = {

    run: async (bot, message) => {
	
	message.reply(`Pong!! Took about ${bot.pings[0]}ms`)
	
},

	conf: {
		owneronly: false, 
		enabled: true,
		guildonly: false
	},

	help: {
		name: "ping",
		description: "Shows the response time of the bot"
	}
};