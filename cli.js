#!/usr/bin/env node

/* eslint-disable no-console */

'use strict';

const { prompt } = require('inquirer');
const chalk = require('chalk');
const { textSync } = require('figlet');
const { readdirSync, writeFileSync, statSync, mkdirSync, readFileSync, writeFile } = require('fs');
const { join } = require('path');
const { info, success, error } = require('log-symbols');
const { exec } = require('child_process');
const { getConfig } = require('./builders');

console.clear();
console.log(chalk.green.bold(textSync('Discord Bot Maker', 'Standard')));

prompt([{
  name: 'project-choice',
  type: 'list',
  message: 'What project template would you like to generate ? :',
  choices: readdirSync(`${__dirname}/templates`).filter(e => e !== '.DS_Store'),
}, {
  name: 'project-name',
  type: 'input',
  message: 'What is your project name ? :',
  // eslint-disable-next-line no-useless-escape
  validate: input => new RegExp(/^(A-za-z\-\_\d])+$/).test(input) ? true :
    'Project name may only include letters, numbers, underscores and hashes.',
}, {
  name: 'bot-name',
  type: 'input',
  message: 'Please enter you\'r bot name :',
}, {
  name: 'token',
  type: 'password',
  message: 'Enter you\'r bot token [Content Hidden] :',
}, {
  name: 'prefix',
  type: 'input',
  message: 'Please enter your\'r bot prefix :',
}, {
  name: 'status',
  type: 'input',
  message: 'Enter status of you\'r bot [online/idle/dnd/invisible] :',
}, {
  name: 'activity',
  type: 'input',
  message: 'Enter activity of you\'r bot [Watching/Listening/Playing] :',
}, {
  name: 'owner',
  type: 'input',
  message: 'Enter your owner id of the bot :',
},
]).then(ans => {
  mkdirSync(join(process.cwd(), ans['project-name'])).catch(e => console.error(e));
  console.log(`${info} Installing project contents..`);
  createDirContents(join(__dirname, 'templates', ans['project-choice']), ans['project-name']);
  console.log(`${info} Done installing project contents...`);

  const dir = ans['project-name'];

  console.log(`${info} Creating config file...`);

  // eslint-disable-next-line consistent-return
  writeFile(`${dir}/config.js`, getConfig(ans.token, ans.activity, ans.status, ans.prefix, ans.owner), err => {
    if (err) return console.log(`${error} Error at config.js creation...`);
  });

  console.log(`${info} Installing dependenices... Might take a while...`);
  exec(`cd ${dir} && npm install`, err => {
    if (err) console.log(err);
    console.log(`${success} Done!`);
  });
});

/**
 *
 * @param  {any} templatePath - Path of the templatePath
 * @param  {any} projectPath - Path of the Project
 * @returns {void}
 */
const createDirContents = (templatePath, projectPath) => {
  for (const file of readdirSync(templatePath)) {
    // eslint-disable-next-line max-len
    const filePath = join(templatePath, file), stats = statSync(filePath), writePath = join(process.cwd(), projectPath, file);
    if (stats.isFile()) {
      writeFileSync(writePath, readFileSync(filePath, 'utf8'), 'utf8');
    } else if (stats.isDirectory()) {
      mkdirSync(writePath);
      createDirContents(join(templatePath, file), join(projectPath, file));
    }
  }
};
