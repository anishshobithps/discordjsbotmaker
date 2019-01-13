# Discord bot Maker

Hello myself Anish Shobith and i am the developer of this npm package Discord Bot Maker

## About:
> * A Tool which creates a discord bot with a CLI <br>
> * Made with discord.js

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

## Pre Requirements:
> * [Git](https://git-scm.com/downloads)
> * [Yarn](https://yarnpkg.com/lang/en/docs/install/)
> * [Nodejs](https://nodejs.org/en/download/)


## Installation:
So we need to install it globally so we can use it whenever we want and thats what we want!!

Installing the Package:
<code>npm i -g discordjsbotmaker</code>
And your done !!

Now working with your project:
1) Go in a directory or folder of your choice 
2) Open command prompt in that folder 
3) In the command line type `discordbotmaker`

And it will ask all the required things!!
Sit back and relax!!

And your project will be Generated with your folder name!!

## TODO:
* [x] Command Handler
* [x] Event Handler
* [ ] Database
* [x] Making cli accept the token and other stuff
* [x] More Commands

## Features
> * Built in Command Handler
> * Built in Event Handler
> * Advanced Help and Eval Command
> * Some more cool commands

## Making a Command
```js
/**
 * Main Package
*/
const Discord = require("discord.js");
/**
 * Other Pacakge Optional
*/

module.exports = {
    run: async (bot, message, args) => {
    //Your Code
},
conf: {
    guildonly: true/false,
    owneronly: true/false,
    enabled: true/false
},

help: {
    name: "commandname",
    aliases: ["commandaliases"/*Add more if you want*/],
    description: "Command Description"
};
```

## Making a Event
```js
module.exports = async (bot/*Other parameters followed by comma(,)*/) => {
    //Your code
}

```
> * Note: Event file name should be as same as given in the docs..

## ChangeLog:

`Version 0.0.1`
* Command Handler
* Event Handler

`Version 0.0.2`
* Added Few Commands
* More Events
* Added Mention as prefix





