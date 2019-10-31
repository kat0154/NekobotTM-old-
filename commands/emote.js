let discord = require('discord.js');

module.exports.help = {
		name: 'emoji',
		alias: 'emote',
		description: 'searches for an emoji in the clients emoji db',
		useage: 'emoji <emoji name|emoji ID>'
}
module.exports.run = async (client, message) => {
		let search = message.content.replace( /  +/g, ' ').split(" ").slice(1).join(" ");
		if (!search)return message.channel.send("Please enter an emoji to search for");
		if(search){
			if(search.includes('<'))search = search.split(':')[1].split(':')[0];
			let em = client.emojis.find(e => e.name == search)||client.emojis.get(search);
			if(!em)return message.channel.send("I couldn't find any emojis with that name/id");
			let emote = em.url;
			let embed = new discord.RichEmbed()
			.setTitle(`${em.name}.${emote.includes('.gif') ? 'gif' : 'png'}`)
			.setColor('#00ffff')
			.setImage(emote)
			message.channel.send(embed);
		}
}
