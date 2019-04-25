const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {

    var embed = new Discord.RichEmbed()
	.setColor(`${message.member.displayHexColor}`)
	.setTimestamp()
        .setDescription('wanna partner? np, just dm `Nekoboy™#7409`')
	.setThumbnail(`${client.user.avatarURL}`)
	.setTitle(`links:`)
	.addField("**link to invite me to a server:**",`[Nekobot™/invite (admin)](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) || [Nekobot™/invite (mod)](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1412820055)`)
	.addField("**link to my support sever:**", `[Nekobot™ official](https://discord.gg/SQFbf9q)`)
        .addField('**Partnered servers:**', `1 - [Vanish inc.](https://discord.gg/KUT87e2)`)
	.addField("**bot list links:**", `[Discord_Bot_List/Nekobot™](https://discordbots.org/bot/389890733576028161) \n[Discord_Bots/Nekobot™](https://bots.discord.pw/bots/389890733576028161)`)
	message.channel.send({embed: embed});
console.log(`sent links to ${message.author.username} in ${message.guild}`);
}

module.exports.help = {
    name: "invite"
}
