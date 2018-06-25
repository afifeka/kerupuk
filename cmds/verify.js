const Discord = require("discord.js")

exports.run = (bot, message, args) => {
	   let user = message.author;
	   if(!user) return; 
	   
	   let role = message.guild.roles.find(`name`, `Newbie`);
	   if(!role) return; 
	   
	   return (user.removeRole(role.id));
	    
}

exports.help = {
	name: "verify"
}
