const Discord = require("discord.js")

exports.help = (bot, message, args) => {
	    const permis = message.guild.roles.find("name", "Staff");
	    if(!permis) return message.reply("Anda tidak berhak untuk menggunakan command ini!")
	    
	    const botuser = message.guild.members.get(args[0]);
	    if(!botuser) return message.reply("Tag bot yang akan anda **issues**!");
	    const ownerbot = message.guild.members.get(args[1]);
	    if(!ownerbot) return message.reply("Tag owner bot tersebut!");
	    
	    if(!args[2]) return message.reply("Berikan alasan/reason kenapa bot tersebut di Issues!")
	    
	    let embed = new Discord.RichEmbed()
	    .setDescription("Bot issues!")
	    .addField("Bot User:", botuser)
	    .addField("Owner Bot", ownerbot)
	    .addField("Reason", args[2])
	    .setColor("#ff0000")
	    .setFooter(`Issues by ${message.author.tag}`)
	    message.channel.send(embed);
	    
}

exports.help = {
	name: "issuesbot"
}
