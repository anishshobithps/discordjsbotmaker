#!/usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
console.clear();
console.log(chalk.green.bold(figlet.textSync("Discord bot maker", "standard")));

inquirer.prompt([{
    name: "project-choice",
    type: "list",
    message: "Select a template!",
    choices: fs.readdirSync(`${__dirname}/templates`).filter(e => e !== ".DS_Store")
}, {
    name: "project-name",
    type: "input",
    message: "Project Name:",
    validate: input => new RegExp(/^([A-Za-z\-\_\d])+$/).test(input) ? true : "Project name may only include letters, numbers, underscores and hashes."
}]).then(answers => {
    fs.mkdirSync(path.join(process.cwd(), answers["project-name"]));
    createDirContents(path.join(__dirname, "templates", answers["project-choice"]), answers["project-name"]);
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