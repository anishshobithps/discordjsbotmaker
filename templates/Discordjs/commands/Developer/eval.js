/**
 * Author: Anish Shobith & Piyush Bhangale - (ionadev)
 * Command: Eval
 */

const { inspect } = require('util');
const Discord = require("discord.js");
module.exports = {

    run: async (bot, message) => {

	function escapeRegex(str) {
		return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

	}
	/**
	 * This below line of code will completely ignore the token no matter what!!
	 */
	if(message.content.includes('bot.token')) {
		return ;
	}

	if(!args[0]) return message.channel.send("Provide me a code to eval!!");

		function clean(text) {
			if (typeof text === 'string') {
				text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);

				let pattern = "";
				if(bot.token) pattern += escapeRegex(bot.token)
				return text.replace(new RegExp(pattern, 'gi'), 'No boi you cant get it!!');
			}

			return text;
		}
		let evaled;
		try {
			const hrStart = process.hrtime();
			evaled = eval(args.join(' ')); // eslint-disable-line no-eval

			if (evaled instanceof Promise) evaled = await evaled;
			const hrStop = process.hrtime(hrStart);

			let response = '';

			response += ` **•Output:**\`\`\`js\n${clean(inspect(evaled, { depth: 0 }), bot.token)}\n\`\`\``;
			
			response += `\n **• Type:** \`\`\`asciidoc\n${typeof evaled}\`\`\``;
			response += `\n **• Time Taken:** \`\`\`${(((hrStop[0] * 1e9) + hrStop[1])) / 1e6}ms\`\`\``;


			if (response.length > 0) {
				await message.channel.send(response);
			}

		} catch (err) {
			return message.channel.send(`Error:\`\`\`xl\n${clean(err, bot.token)}\n\`\`\``);
		}
	},

	conf:{
		enabled: true,
		owneronly: true,
		guildonly: false
	},

	help: {
        name: "eval",
        alaises: ["e", "ev"],
		description: "Evals any JavaScript code"
	}
};
