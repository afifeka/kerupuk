const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("User tidak ditemukan");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Anda tidak izin untuk menggunakan command ini");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tidak bisa banned user tersebut");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#bc0000")
    .addField("User", `**${bUser}**`)
    .addField("Moderator", `**<@${message.author.id}>**`)
    .addField("Reason", `**${bReason}**`);

    let incidentchannel = message.guild.channels.find(`name`, "mod-logs");
    if(!incidentchannel) return message.channel.send("channel bernama **mod-logs** tidak ditemukan");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    message.delete().catch(O_o=>{});
    message.channel.send("Sukses banned user tersebut");


    return;
}

exports.help = {
	name: "ban"
}
