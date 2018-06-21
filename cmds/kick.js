exports.help = (bot, message, args) => {
	    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("Kicked User", `**${kUser}**`)
    .addField("Kicked By", `**<@${message.author.id}>**`)
    .addField("Reason", `${kReason}`);

    let kickChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!kickChannel) return message.channel.send("Can't find **mod-logs** channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
	  
    message.delete().catch(O_o=>{});
    message.channel.send("Success kicked the player");

    return;
}

exports.help = {
	name: "kick"
}
