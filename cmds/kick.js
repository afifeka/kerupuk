exports.help = (bot, message, args) => {
	    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("User tidak ditemukan");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Anda tidak ada izin untuk menggunakan command ini");								 ");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tidak bisa kick user tersebut ");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("User", `**${kUser}**`)
    .addField("Moderator", `**<@${message.author.id}>**`)
    .addField("Reason", `${kReason}`);

    let kickChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!kickChannel) return message.channel.send("Channel **mod-logs** tidak ditemukan.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
	  
    message.delete().catch(O_o=>{});
    message.channel.send("Sukses kick user tersebut");

    return;
}

exports.help = {
	name: "kick"
}
