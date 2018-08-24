const Discord = require("discord.js");
const cpu = process.cpuUsage().system / 1024 / 1024;
const used = process.memoryUsage().heapUsed / 1024 / 1024;

module.exports.run = async (bot, message, args) => {
    let uptimes = (Math.round(bot.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(bot.uptime / 1000) % 60) + " seconds.\n"

    let testembed = new Discord.RichEmbed()
    .setDescription("**STATS**")
    .setColor("#00fa3d")
    .addField("Total Server", `${bot.guilds.size} Servers!`)
    .addField("Total Channels", `${bot.channels.size} Channels!`)
    .addField("Total Users", `${bot.users.size.toLocaleString()} Users!`)
    .addField("CPU Usage", `${Math.round(cpu * 100) / 100}%`, true)
    .addField("Memory Usage", `${Math.round(used * 100) / 100} MB`)
    .addField("Uptime", uptimes)
    .addField("Owner", "<@401327121580032000> (401327121580032000) ")
    .addField("Version", "Alpha v0.1.100")
    .setFooter("© kerupuk | Discord.js")

    message.channel.send(testembed);

}

module.exports.help = {
  name: "stats"
}
