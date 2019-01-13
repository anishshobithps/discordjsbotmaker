/**
 * Author: Anish Shobith
 * Event : ready
 */

 const chalk = require("chalk");

const config = require("../config");

module.exports = async (bot) => {
    console.clear()
    setGame()
    console.log(chalk.blue(`${bot.user.username} has started with ${bot.commands.size} commands and ${bot.eventNames().length - 2} events!!`))
    console.log(`Built with Discord bot maker by Anish Shobith!`)

    function setGame()  {
        const set = () => {
            bot.user.setActivity(`for ${config.prefix}help ${bot.guilds.size} Guilds and ${bot.users.size} Users!`, {type:config.activity}).catch(err => console.log(err))
        };

        set();
        setInterval(() => set(), 60*60000);
        bot.user.setStatus(`${config.status}`).catch(console.error);
    }
}

