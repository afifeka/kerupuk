const Discord = require("discord.js");
const pkg = require("../package.json");

exports.run = async (bot, message, args) => {

    if (!args[0]){
    let pages = [`**Member**\n> \`avatar\` - Tampilkan foto profil  seseorang
> \`ping\` -  Melihat kecepatan internet kamu
> \`report\` - Report orang mbeling
> \`invite\` - Invite bot **${bot.username}**`, `**Moderation**\n>\`ban\` - Banned orang melanggar peraturan
> \`kick\` - Kick orang yang nakal
> \`warn\` - Warned orang buka bokep`];
    let page = 1;
    
    const embed = new Discord.RichEmbed()
    .setColor("#f6f940")
    .setFooter(`Page ${page} of ${pages.length} • © ${bot.username} | Alpha ${pkg.version}`)
    .setDescription(pages[page-1])
    
    message.channel.send(embed).then(msg => {
    
    msg.react(`◀`).then( r => {
    msg.react(`▶`)
    
    const backwardsFilter = (reaction, user) => reaction.emoji.name === `◀` && user.id === message.author.id;
    const forwardsFilter = (reaction, user) => reaction.emoji.name === `▶` && user.id === message.author.id;

    const backwards = msg.createReactionCollector(backwardsFilter, { time:60000 });
    const forwards = msg.createReactionCollector(forwardsFilter, { time:60000 });

    backwards.on('collect', r => {
        if (page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length} • © ${pkg.name} | Alpha ${pkg.version}`)
        msg.edit(embed)
    })
    
    forwards.on('collect', r => {
    if (page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length} • © ${pkg.name} | Alpha ${pkg.version}`)
        msg.edit(embed)
        });
    });
});
    }
    if (args[0] === 'admin') {
    let pages2 = [`**Page: 1**\n\`addrole\` - berikan role kepada seseorang.\n\`ban\` - banned seseorang dari guild.\n\`kick\` - kick seseorang dari guild.\n\`mute\` - mute seseorang.`,`
     **Page: 2**\n\`remrole\` - hapus role dari seseorang.\n\`unban\` - Unban seseorang.\n\`warn\` - Warn seseorang.\n\`warnings\` -  Periksa jumlah warning`];
    let page2 = 1;
    
    const embed2 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setFooter(`Page ${page2} of ${pages2.length} • © ${pkg.name} | Alpha ${pkg.version}`)
    .setDescription(pages2[page2-1])
    
    message.channel.send(embed2).then(msg => {
    
    msg.react(`◀`).then( r => {
    msg.react(`▶`)
    
    const backwardsFilter = (reaction, user) => reaction.emoji.name === `◀` && user.id === message.author.id;
    const forwardsFilter = (reaction, user) => reaction.emoji.name === `▶` && user.id === message.author.id;

    const backwards = msg.createReactionCollector(backwardsFilter, { time:60000 });
    const forwards = msg.createReactionCollector(forwardsFilter, { time:60000 });

    backwards.on('collect', r => {
        if (page2 === 1) return;
            page2--;
            embed2.setDescription(pages2[page2-1]);
            embed2.setFooter(`Page ${page2} of ${pages2.length} • © ${pkg.name} | Alpha ${pkg.version}`)
            msg.edit(embed2)
    });
    
    forwards.on('collect', r => {
        if (page2 === pages2.length) return;
            page2++;
            embed2.setDescription(pages2[page2-1]);
            embed2.setFooter(`Page ${page2} of ${pages2.length} • © ${pkg.name} | Alpha ${pkg.version}`)
            msg.edit(embed2)
            });
        });
    });
    }
}

exports.help = {
    name: "help",
    description: 'Menampilkan semua perintah',
    usage: '~help <perintah>'
}
