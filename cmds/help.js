const Discord = require("discord.js");
const pkg = require("../package.json");

exports.run = async (bot, message, args) => {

    if (!args[0]){
    let pages = [`**Member**\n> \`avatar\` - Tampilkan foto profil  seseorang
> \`ping\` -  Melihat kecepatan internet kamu
> \`report\` - Report orang mbeling
> \`invite\` - Invite bot **<@458654300575498270>**`, `**Moderation**\n> \`ban\` - Banned orang melanggar peraturan
> \`kick\` - Kick orang yang nakal
> \`warn\` - Warned orang buka bokep`, `**Core**\n> \`autorole\` - Menetapkan untuk auto Role\n> \`setprefix\` - Menetapkan prefix dalam server`, `**Nfsw**\n> \`hentai\` - Lihat Anime Gk Pake Baju\n> \`hentaigif\` - Foto gif buat orang bego`];
    let page = 1;
    
    const embed = new Discord.RichEmbed()
    .setColor("#f6f940")
    .setFooter(`Page ${page} of ${pages.length} • © ${bot.user.username} | Alpha ${pkg.version}`)
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
}

exports.help = {
    name: "help",
    description: 'Menampilkan semua perintah',
    usage: '~help <perintah>'
}
