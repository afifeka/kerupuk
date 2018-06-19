const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});
const cfg = require("./botconfig.json");
const fs = require("fs");

bot.on("message", async message => {
  if(message.author.bot) return;
	
    if(message.channel.type === "dm") {
        var embed = new Discord.RichEmbed()
        .setTitle("Tidak ada command Dm's")
        .setColor("RED")
        .setThumbnail(`${message.author.displayAvatarURL}`)
        .setTimestamp()
        .addField("ERROR!", "Anda tidak bisa menggunakan command lewat DM!")
         message.channel.send({ embed: embed })
         return;
    }

 
    let prefix = cfg.prefix;
    let msg = message.content.toLowerCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (message.content === `<@${bot.user.id}>`) {
        message.channel.send(`Halo <@${message.author.id}>, Kerupuk dengan prefix \`${prefix}\``);
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
	
	let channel = member.guild.channels.find("name", "bot-spam")
	
	channel.send(`Selamat Datang **${member.user.username}**, Di Server **${member.guild.name}**, Total Member **${member.guild.memberCount}**`)
	
});

bot.on("guildMemberRemove", member => {
	let guild = member.guild;
	
	let channel = member.guild.channels.find("name", "bot-spam")
	
	channel.send(`Selamat Tinggal **${member.user.username}**, Dari Server **${member.guild.name}**, Total Member **${member.guild.memberCount}**`)

});


bot.on("ready", async () => {
    console.log(`${bot.user.tag} is ready!`);
    
});

bot.login(process.env.BOT_TOKEN);
