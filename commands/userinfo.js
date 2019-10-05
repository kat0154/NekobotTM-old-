const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
	path: '../../commands/userinfo.js',
	help: {
		name: 'userinfo',
		alias: 'ui',
		enabled: true,
		guildOnly: true,
		permLevel: 0,
		description: 'Returns a users info in the server',
		useage: 'userinfo (@user)'
	},
	run: async (client,message) => {
		    let name = message.content.replace( /  +/g, ' ').split(" ").slice(1).join(" ");
			var mem = message.mentions.members.first()||message.guild.members.get(name)||message.guild.members.find(m => m.displayName.toLowerCase().includes(name.toLowerCase()));
			if (mem) {
				var embed = new Discord.RichEmbed()
				.setColor(`${mem.displayHexColor == '#000000' ? '#00ffff' : mem.displayHexColor}`)
				.setTimestamp()
				.setThumbnail(`${mem.user.avatarURL}`)
				.setAuthor(`Info on: ${mem.user.tag}`, mem.user.displayAvatarURL)
				.addField(`**ID:**`, `${mem.user.id}`)
				.addField(`**Status:**`, `${mem.presence.status}`)
				.addField(`**Created:**`, `${moment(mem.user.createdAt).format('MMMM Do YYYY, h:mm a')}`)
				.addField(`**Joined:**`, `${moment(mem.joinedAt).format('MMMM Do YYYY, h:mm a')}`)
				.addField(`**Highest role:**`, `${mem.highestRole.name}`)
				.addField(`**Hoist role?:**`, `${mem.hoistRole.name}`)
				.addField(`**display Color:**`, `${mem.displayHexColor}`)
				.addField(`**Roles:**`, `${mem.roles.map(r => r).slice(1,16).join(' | ')}`)
				.setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
				message.channel.send(embed);
			}
			if (!mem) {
				var embed = new Discord.RichEmbed()
				.setColor(`${message.member.displayHexColor == '#000000' ? '#00ffff' : message.member.displayHexColor}`)
				.setTimestamp()
				.setThumbnail(`${message.author.avatarURL}`)
				.setAuthor(`Info on: ${message.author.tag}`, message.author.displayAvatarURL)
				.addField(`**ID:**`, `${message.author.id}`)
				.addField(`**Status:**`, `${message.member.presence.status}`)
				.addField(`**Created:**`, `${moment(message.author.createdAt).format('MMMM Do YYYY, h:mm a')}`)
				.addField(`**Joined:**`, `${moment(message.member.joinedAt).format('MMMM Do YYYY, h:mm a')}`)
				.addField(`**Highest role?:**`, `${message.member.highestRole.name}`)
				.addField(`**Hoist role:**`, `${message.member.hoistRole.name}`)
				.addField(`**Display Color:**`, `${message.member.displayHexColor}`)
				.addField(`**Roles:**`, `${message.member.roles.map(r => r).slice(1,16).join(' | ')}`)
				.setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
				message.channel.send(embed);
			}
	}
}
