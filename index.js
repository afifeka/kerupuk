const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});
const cfg = require("./botconfig.json");
const fs = require("fs");
const prefixes = require("./prefixes.json")

bot.on("message", async message => {
    if(message.author.bot) return;
	
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
        message.channel.send(`Halo <@${message.author.id}>, Kerupuk dengan Prefix \`${prefix}\``);
        message.react('😁');
    }
    

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
	
	let channel = member.guild.channels.find("name", "join-left")
	
	channel.send(`Welcome, to the server ${member}`)
	
});

bot.on("guildMemberRemove", member => {
	let guild = member.guild;
	
	let channel = member.guild.channels.find("name", "join-left")
	
channel.send(`Goodbye, plase come back ${member.user.username}`)

});


bot.on("ready", async () => {
    console.log(`${bot.user.tag} is ready!`);
    bot.user.setGame("Sedang dimasak!");
    bot.users.get("401327121580032000").send(`${bot.user.tag} Has Online, Success Reloaded All File's`);
   
});

bot.login(process.env.BOT_TOKEN);
