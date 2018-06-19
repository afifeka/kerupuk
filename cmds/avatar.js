const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(member.user.tag)
    .setDescription(`[Download](${member.user.displayAvatarURL})`)
    .setImage(member.user.displayAvatarURL);

    message.channel.send(embed);

}

exports.help = {
    name: "avatar",
    description: "show your avatar or other avatar",
    usage: "suzu avatar <mention or user ID>"
}
