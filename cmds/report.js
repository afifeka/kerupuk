exports.help = (bot, message, args) => {
	    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("User tidak ditemukan");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("User", `**${rUser}**`)
    .addField("Pelapor", `**${message.author}**`)
    .addField("Reason", `**${rreason}**`);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Channel **reports** tidak ditemukan");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.channel.send("Sukses report user tersebut");

    return;
}

exports.help = {
	name: "ban"
}
