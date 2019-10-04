const Discord = require("discord.js");
const parseTime = function(milliseconds) {
    var seconds = Math.floor(milliseconds/1000); milliseconds %= 1000;
    var minutes = Math.floor(seconds/60); seconds %= 60;
    var hours = Math.floor(minutes/60); minutes %= 60;
    var days = Math.floor(hours/24); hours %= 24;
    var written = false;
    return(days?(written=true,days+"D"):"")+(written?", ":"")
      +(hours?(written=true,hours+"H"):"")+(written?", ":"")
      +(minutes?(written=true,minutes+"M"):"")+(written?", ":"")
      +(seconds?(written=true,seconds+"S"):"")+(written?" ":"");
};

module.exports = {
	pah: '../../commands/Information/botinfo.js',
	help: {
		name: 'botinfo',
		aliases: ['binfo'],
		enabled: true,
		guildOnly: true,
		permLevel: 0,
		description: 'Returns the bots info',
		useage: 'botinfo'
	},
	run: async (client,message) => {
		let neko = client.users.get("377271843502948354");
		let uses = client.users.filter(u=>u.bot===false).size;
		let bots = client.users.filter(u=>u.bot===true).size;
  
		const c = new Date(client.user.createdAt);
		const date = c.toLocaleString().split('/');
		const listeners = function(){
			const i = 0;
			client.voice.connections.forEach(c => {
				c.channel.members.forEach(m => {
					if(!m.user.bot){
						++i
					}
				})
			});
			return i;
		}

		let embed = new Discord.RichEmbed()
		.setAuthor(`Bot Info for ${client.user.username}:`, `${client.user.avatarURL}`)
		.setColor(`${message.member.displayHexColor === "#000000" ? "#00ffff" : message.member.displayHexColor}`)
		.setThumbnail(`${client.user.avatarURL}`)
		.setTimestamp()
		.addField('**Bot name:**', `\`\`\`css\n${message.guild.members.get(client.user.id).displayName}\`\`\``, true)
		.addField('**Creator:**', `\`\`\`css\n${neko.username}#${neko.discriminator}\`\`\``, true)
		.addField('**Node.js:**', `\`\`\`css\n${process.version}\`\`\``, true)
		.addField('**Discord.js:**', `\`\`\`css\nv${Discord.version}\`\`\``, true)
		.addField('**Useage:**', `\`\`\`css\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, true)
		.addField('**Uptime:**', `\`\`\`css\n${parseTime(client.uptime)}\`\`\``, true)
		.addField('**Servers:**', `\`\`\`css\n${client.guilds.size}\`\`\``, true)
		.addField('**Channels:**', `\`\`\`css\n${client.channels.size}\`\`\``, true)
		.addField('**Members:**', `\`\`\`css\n${uses}\`\`\``, true)
		.addField('**Bots:**', `\`\`\`css\n${bots}\`\`\``, true)
		.setDescription(`\`\`\`${client.user.tag} was Created on ${date[0]}-${date[1]}-${date[2].split(', ')[0]}\`\`\``)
		.setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`);
		if(client.voice.connections.size === 0){
			
		}
		if(client.voice.connections.size > 0){
			embed.addField('**Connections:**', `\`\`\`css\n${client.voice.connections.size}\`\`\``, true)
			embed.addField('**Listeners:**', `\`\`\`css\n${listeners()}\`\`\``, true)
		}
		message.channel.send(embed);
	}
}
