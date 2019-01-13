/**
 * Author: Anish Shobith
 * Main file
 */

const Discord = require('discord.js')
const bot = new Discord.Client()
bot.firstLoadTime = Date.now()
const config = require("./config");
bot.config = config;
require("./Internals/commandhandler.js")(bot)
require("./Internals/eventhandler.js")(bot)
bot.login(bot.config.token);