const fs = require("fs");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Anda tidak ada izin untuk menggunakan command ini");
	let channels = JSON.parse(fs.readFileSync("./channels.json", "utf8"));
	if (!args[0]) { // jika tidak ada argument makan autorole akan dimatikan
		channels[message.guild.id] = {
			channel: 0
		};
		fs.writeFile("./channels.json", JSON.stringify(channels), (err) => {
			if (err) console.log(err);
		});
		message.reply("Silakan ketik nama channel untuk dijadikan autorole");
    }
	if (args[0]) { // jika ada argumen maka akan dijadikan autorole
		let channelz = args.join(" ");
		let channel = message.guild.roles.find("name", channelz);
		channels[message.guild.id] = {
			channel: channel // yang diambil hanya id nya saja
		};
		fs.writeFile("./channels.json", JSON.stringify(channels), (err) => {
			if (err) console.log(err)
		});
		message.reply(`welcomeChannel pada server ini telah aktif **${channel.name}**`);
	}
}

exports.help = {
	name: "setwelcomechannel"
}
