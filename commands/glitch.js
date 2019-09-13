const Discord = require("discord.js");

module.exports = {
	path: '../../commands/Misc/glitch.js',
	help: {
		name: 'glitch',
		alias: 'bug',
		useage: 'Nb.glitch <command> <detailed issue of command>'
	},
	run: async (client,message) => {
		let comd = message.content.replace( /  +/g, ' ').split(" ").slice(1,2).join(" ");
		let glitch = message.content.replace( /  +/g, ' ').split(" ").slice(2).join(" ");
		let command = client.commands.get(comd);
		let alias = client.aliases.get(comd);
		if(!command && !alias)return message.channel.send(`oof, I couldn't find \`"${comd}"\` in my db of commands`);


		let servr = client.guilds.get("413921975312842752");
		let bugchannl = servr.channels.get("450932371097780224");
		message.channel.send("i've let my developer know about the bug, thanks for the feedback");
		
		let embed = new Discord.RichEmbed()
		.setTitle('Bug Report:')
		.setThumbnail(client.user.displayAvatarURL)
		.setColor("#fff000")
		.addField('**Command:**', `${command ? command.help.name : alias.help.name}`)
		.addField(`**${message.content.split(" ")[0].slice(3)}:**`, `${glitch}`)
		.addField("**Reported by:**", `${message.author.tag}\nPing: <@${message.author.id}>\nThier ID: ${message.author.id}`)
		.setFooter("Pending Approval...")
		bugchannl.send('<@377271843502948354>',{embed}).then(async msg => {
              const reaction1 = await msg.react('✅');
			  const reaction2 = await msg.react('❎');
					let i = 0;
			  const collector = msg.createReactionCollector((reaction, user) => user.id === "377271843502948354", {
				    time: 1000*60*60*24  //1 day
			  });
			  collector.on('collect', r => {
					if (r.emoji.name === '✅') {//:white_check_mark:
						msg.reactions.forEach(r => {
							r.remove();
						});
						embed.setColor("#00ff00")
						embed.setTimestamp()
						embed.setFooter(`Acknowledged`,client.users.get("377271843502948354").displayAvatarURL)
						msg.edit(embed);
						let apr = new Discord.RichEmbed()
						     .setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
							 .setColor('#00ff00')
							 .setDescription("Thanks for letting me know there's a bug in my code, i actually appreciate it very much and tbh i didn't think anyone actually used this bot anymore.\nI'll get to fixing that issue as soon as i can, so dw.")
							 .setTimestamp()
						message.author.send(apr);
                    }
					if(r.emoji.name === '❎') {//:negative_squared_cross_mark: 
						msg.reactions.forEach(r => {
							r.remove();
						});
						embed.setColor("#ff0000")
						embed.setTimestamp()
						embed.setFooter(`Copy`,client.users.get("377271843502948354").displayAvatarURL)
						msg.edit(embed);
						let den = new Discord.RichEmbed()
						     .setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
							 .setColor('#ff0000')
							 .setDescription("Thanks for letting me know there's a bug in my code, i actually appreciate it very much and tbh i didn't think anyone actually used this bot anymore.\nUnfortunately someone had already brought this issue to my attention and i've yet to fix it, sorry for the wait.")
							 .setTimestamp()
						message.author.send(den);
                    }
				})
				collector.on('end', () => {
					msg.reactions.forEach(r => {
						r.remove();
					});
					embed.setColor("#fff000")
					embed.setTimestamp()
					embed.setFooter(`Missed`,client.users.get("377271843502948354").displayAvatarURL)
					msg.edit(embed);
				});
		})
	}
}
