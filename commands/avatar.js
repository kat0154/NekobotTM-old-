const discord = require("discord.js");

module.exports.help = {
        name: "avatar",
        alias: "av",
        type: "Misc",
        info: "Gets a users avatar",
        perms: "MEMBER / none",
        useage: `@user / {prefix}avatar`
    }
module.exports.run = async (client,message) => {
        let sum1 = message.content.replace( /  +/g, ' ').split(' ').slice(1).join(' ');
        if(sum1.toLowerCase().includes("avatar"))sum1 = message.content.replace( /  +/g, ' ').split(' ').slice(2).join(' ');
        let user = message.mentions.users.find(m => m.id !== client.user.id)||client.users.filter(u => u.username.toLowerCase().includes(sum1.toLowerCase())).first()||client.users.get(sum1)||message.author;
        if(user == message.author && sum1){
          user = await client.fetchUser(sum1);
        }
        let link = user.displayAvatarURL.includes('gif') ? `${user.displayAvatarURL}?size=2048` : user.displayAvatarURL;
        let embed = new discord.RichEmbed()
        .setDescription(`**Avatar for:** ${user.username}\n[link](${link})`)
        .setColor('#00ffff')
        .setTimestamp()
	.setImage(`${link}`)
	.setFooter(`Requested by: ${message.member.displayName}`, `${message.author.displayAvatarURL}`)
        return message.channel.send(embed);
}
