const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

exports.run = async (bot, message, args) => {
      if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");

    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor("4k", bot.user.avatarURL)
                .setFooter("L0L")
                .setImage(url);
            message.channel.send({
                embed
            });
        });
}

exports.help = {
	name: "xxx"
}
