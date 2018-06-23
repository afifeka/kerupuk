const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args, color) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Anda tidak ada izin untuk menggunakan command ini");
    
    let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    return message.channel.send(`Prefix baru diserver ini adalah \`${args[0]}\`! `);
}

exports.help = {
    name: "prefix",
    description: "Change your server prefix",
    usage: "suzu prefix <new prefix>"
}
