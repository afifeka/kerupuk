const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
	
	let botid = args[0] // bot id
	if(!botid) return message.channel.send("Kirimkan bot id kamu!");
	
	let prefix = args[1]
	if(!prefix) return message.channel.send("Kirimkan prefix bot kamu!")
	
	let embed = new Discord.RichEmbed()
	.setDescription("Invite Bot!")
	.addField("Nama Bot", botid.username)
	.addField("Prefix Bot", prefix)
	.setColor("RANDOM")
	.setFooter("Test Command")
	return message.channel.send(embed)
	
	
}

exports.help = {
    name: "invitebot"
}
    
