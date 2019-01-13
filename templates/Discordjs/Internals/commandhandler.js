/**
 * Author: Anish Shobith
 * Handler: Command Handler
 */

 const Discord = require('discord.js');
const fs = require('fs');

module.exports = (bot) => {
    bot.commands = new Discord.Collection();
    bot.aliases = new Discord.Collection();
    bot.helps = new Discord.Collection();
 
    fs.readdir('./commands/', (err, categories) => {
        if (err) console.log(err);
        console.log(`Found total ${categories.length} category.`);
        categories.forEach(category => {
            let moduleConf = require(`../commands/${category}/module.json`);
            moduleConf.path = `./commands/${category}`;
            moduleConf.cmds = [];
            bot.helps.set(category, moduleConf);
            if (!moduleConf) return;
            fs.readdir(`./commands/${category}`, (err, files) => {
                console.log(`Found total ${files.length - 1} command from ${category}.`)
                if (err) console.log(err);
                files.forEach(file => {
                    if (!file.endsWith('.js')) return;
                    let prop = require(`../commands/${category}/${file}`);
                    bot.commands.set(prop.help.name, prop);
                    if(prop.help.aliases) prop.help.aliases.forEach(alias => {
                        bot.aliases.set(alias, prop.help.name);
                    });
                    bot.helps.get(category).cmds.push(prop.help.name)
                });
            });
        });
    });
 }