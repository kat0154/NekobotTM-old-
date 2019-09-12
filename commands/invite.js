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
        message.channel.send(embed).then(msg=>msg.delete(15000));
}

module.exports.help = {
    name: "invite",
    alias: "inv"
}
