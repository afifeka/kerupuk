exports.help = (bot, message, args) => {
		let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!wUser) return message.channel.send("User tidak ditemukan!");
        let wReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Anda tidak ada izin!");
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tidak bisa warned user tersebut!");
  
  let wembed = new Discord.RichEmbed()
    .setDescription("Warned")
    .setColor("#e56b00")
    .addField("Warned User", `**${wUser}**`)
    .addField("Moderator", `**<@${message.author.id}>**`)
    .addField("Reason", `${wReason}`);
    
    let warnedChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!warnedChannel) return message.channel.send("Channel **mod-logs** tidak ditemukan")
    
    message.delete().catch(O_o=>{});
    warnedChannel.send(wembed);
    message.channel.send("Sukses warned user tersebut");

  return; 
}

exports.help = {
	name: "ban"
}
