#!/usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");
const path = require("path");
const symbols = require("log-symbols");
const { exec } = require("child_process");
const builders = require('./builders')

console.clear();
console.log(chalk.green.bold(figlet.textSync("Discord Bot Maker", "standard")));

inquirer.prompt([{
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: fs.readdirSync(`${__dirname}/templates`).filter(e => e !== ".DS_Store")
}, {
    name: "project-name",
    type: "input",
    message: "Project Name:",
    validate: input => new RegExp(/^([A-Za-z\-\_\d])+$/).test(input) ? true : "Project name may only include letters, numbers, underscores and hashes."
}, {
    name: "token",
    type: "password",
    message: "Enter your bot token:"
}, {
    name: "prefix",
    type: "input",
    message: "Enter your bot's Prefix:"
}, {
    name: "status",
    type: "input",
    message: "Enter status of your bot[online/idle/dnd/invisible]:"
}, {
    name: "activity",
    type: "input",
    message: "Enter activity of your bot[Watching/Listening/Playing]:"
}, {
    name: "owner",
    type: "input",
    message: "Enter your owner id of the bot:"
}
]).then(answers => {
    fs.mkdirSync(path.join(process.cwd(), answers["project-name"]));
    console.log(`${symbols.info} Installing Project Contents`)
    createDirContents(path.join(__dirname, "templates", answers["project-choice"]), answers["project-name"]);
    console.log(`${symbols.success} Done installing Project Contents...`)
    let dir = answers["project-name"];

    console.log(`${symbols.info} Creating config.js`)
    fs.writeFile(`${dir}/config.js`, builders.getconfig(answers.token, answers.activity, answers.status, answers.prefix, answers.owner), err => {
        if (err)
            return log(`${logSymbols.error} Error at config.js creation`)
    })

    console.log(`${symbols.info} Installing Dependenices... Might take a while`)
    exec(`cd ${dir} && yarn`, (err, stdout, stderr) => {
        console.log(`${symbols.success} Done!!`)
    })
});

const createDirContents = (templatePath, projectPath) => {
    for (const file of fs.readdirSync(templatePath)) {
        const filePath = path.join(templatePath, file), stats = fs.statSync(filePath), writePath = path.join(process.cwd(), projectPath, file);
        if (stats.isFile()) fs.writeFileSync(writePath, fs.readFileSync(filePath, 'utf8'), 'utf8');
        else if (stats.isDirectory()) {
            fs.mkdirSync(writePath);
            createDirContents(path.join(templatePath, file), path.join(projectPath, file));
        }
    }
};