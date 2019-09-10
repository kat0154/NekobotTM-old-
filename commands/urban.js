const snekfetch = require('snekfetch');
const Discord = require('discord.js');

module.exports = {
path: '../../commands/urban.js',
help: {
	name: 'urban',
	alias: 'ud',
	category: 'Fun',
	description: 'Gets a definition from UrbanDictionary',
	usage: 'urban [term]'
},
run: (client, message) => {
if(!message.channel.nsfw)return message.channel.send('This command can only be used in an ||NSFW|| channel');
	let term = message.content.replace( /  +/g, ' ').split(' ').slice(1).join(" ");
        if(message.content.replace( /  +/g, ' ').split(' ').slice(1,2).join(" ") === "urban"||message.content.replace( /  +/g, ' ').split(' ').slice(1,2).join(" ") === "ud")term = message.content.replace( /  +/g, ' ').split(' ').slice(2).join(" ");
         
	if (!term) return message.reply('Need a term to search for...');

	snekfetch.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`).then((data) => {
		if(!data.body.list[0]) return message.reply('No definition found for that term');

		var more = `http://${term.replace(' ', '-')}.urbanup.com`;

		var defEmbed = new Discord.RichEmbed()
			.setAuthor(`UrbanDictionary Definition (1/${data.body.list.length})`,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHj3pIh3_Ih2xh7-AKWmHVQJDH_ulKIQNmEsDkb0CLnWZWC9xs8g')
			.setColor('#cbb723')
			.addField(data.body.list[0].word,`\n\n————\n\n👍 ${(data.body.list[0].thumbs_up).toLocaleString()}\n👎 ${(data.body.list[0].thumbs_down)}`)
			.addField(`Definition`, data.body.list[0].definition)
			.addField(`Example`, data.body.list[0].example || 'NO EXAMPLE GIVEN')
			.addField(`More definitions for this term`, more)
			.setFooter(`Written by: ${data.body.list[0].author}`);

		message.channel.send(defEmbed).then(msg=>{
        if(data.body.list.length > 1) {
		  const reaction1 = msg.react('◀');
		  const reaction2 = msg.react('▶');
		  let i = 0;

		  const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
			  time: 120000
		  });
		  collector.on('collect', r => {
			  const reactionadd = i+1;
			  const reactionremove = i-1;

			  if (r.emoji.name === '▶' && reactionadd !== 0) {
				  r.remove(message.author.id);
				  i += 1;
          
				   const newEmbed = new Discord.RichEmbed()
					.setAuthor(`UrbanDictionary Definition (${i}/${data.body.list.length})`,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHj3pIh3_Ih2xh7-AKWmHVQJDH_ulKIQNmEsDkb0CLnWZWC9xs8g')
					.setColor('#cbb723')
					.addField(data.body.list[i].word,`\n\n————\n\n👍 ${(data.body.list[i].thumbs_up).toLocaleString()}\n👎 ${(data.body.list[i].thumbs_down)}`)
					.addField(`Definition`, data.body.list[i].definition)
					.addField(`Example`, data.body.list[i].example || 'NO EXAMPLE GIVEN')
					.addField(`More definitions for this term`, more)
					.setFooter(`Written by: ${data.body.list[i].author}`);
					msg.edit(newEmbed);
			  } else if (r.emoji.name === '◀' && reactionremove !== 0) {
				  r.remove(message.author.id);
				  i -= 1;

				  const newEmbed = new Discord.RichEmbed()
					.setAuthor(`UrbanDictionary Definition (${i}/${data.body.list.length})`,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHj3pIh3_Ih2xh7-AKWmHVQJDH_ulKIQNmEsDkb0CLnWZWC9xs8g')
					.setColor('#cbb723')
					.addField(data.body.list[i].word,`\n\n————\n\n👍 ${(data.body.list[i].thumbs_up).toLocaleString()}\n👎 ${(data.body.list[i].thumbs_down)}`)
					.addField(`Definition`, data.body.list[i].definition)
					.addField(`Example`, data.body.list[i].example || 'NO EXAMPLE GIVEN')
					.addField(`More definitions for this term`, more)
					.setFooter(`Written by: ${data.body.list[i].author}`);
					msg.edit(newEmbed);
			  }
		  });
	    collector.on('end', () => {
			  reaction1.remove();
			  reaction2.remove();
		  });
	  }
    }).catch((e) => {
            console.error(e);
    });
	}).catch((err) => console.error(err));
 }
}
