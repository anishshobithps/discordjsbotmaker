module.exports.run = async (bot, message, args) => {
	
	message.reply(`Pong!! Took about ${bot.pings[0]}ms`)
	
}

module.exports.help = {
	name: "ping",
	aliases: ["ping-pong"],
	owneronly: false, // if you set it true it will be onwer only command
	enabled: true // if you set to false the command will be disabled
}