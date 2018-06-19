const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});
const cfg = require("./botconfig.json");
const fs = require("fs");
const colors = require('colors');
const moment = require('moment');
const snekfetch = require("snekfetch");
const prefixes = require("./prefixes.json")
const db = require('quick.db');
const figlet = require('figlet');

bot.on("message", async message => {
  if(message.author.bot) return;
	
    if(message.channel.type === "dm") {
        var embed = new Discord.RichEmbed()
        .setTitle("Not Working On DM's!")
        .setColor("RED")
        .setThumbnail(`${message.author.displayAvatarURL}`)
        .setTimestamp()
        .addField("ERROR!", "I currently don't work in DMs")
         message.channel.send({ embed: embed })
         return;
    }

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: cfg.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;
    let msg = message.content.toLowerCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (message.content === `<@${bot.user.id}>`) {
        message.channel.send(`Hello <@${message.author.id}>, Cloud With Prefix \`${prefix}\``);
        message.react('🆗');
    }
	
   if (message.content === `${prefix}setGame`) {

   var embedNoWork = new Discord.RichEmbed()
  .setTitle("Restricted!")
  .setColor("#f45f42")
  .addField("You are restricted from this command", "Its for the command owners only!")
    
    var authors = ["401327121580032000"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embedNoWork});
   }
    
    if(!args[0]) return message.reply("Plase paste your text!")
    
    bot.user.setGame(`${args[0]}`);
    
    
    return  message.channel.send("Success update Game!")
    
};
    

    if (sender.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {
        let commandFile = require(`./cmds/${cmd}.js`);
        commandFile.run(bot, message, args);
    } catch(e) {
        console.log(e.message);
    } finally {
        console.log(`${message.author.username} | ${cmd} | ${message.guild.name}`);
    }
});

bot.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) {
		autorole[member.guild.id] = {
			autorole: cfg.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role)
	member.addRole(role);
});

bot.on("guildMemberAdd", member => {
	let guild = member.guild;
	
	let channel = member.guild.channels.find("name", "bot-spam")
	
	channel.send(`Welcome, **${member.user.username}**, In Server **${member.guild.name}**, Total Member **${member.guild.memberCount}**`)
	
});

bot.on("guildMemberRemove", member => {
	let guild = member.guild;
	
	let channel = member.guild.channels.find("name", "bot-spam")
	
	channel.send(`GoodBye, **${member.user.username}**, On Server **${member.guild.name}**, Total Member **${member.guild.memberCount}**`)

});


bot.on("ready", async () => {
    console.log(`${bot.user.tag} is ready!`);
    bot.users.get("401327121580032000").send(`${bot.user.tag} Has Online, Success Reloaded All File's`);
   
});

bot.login(process.env.BOT_TOKEN);
