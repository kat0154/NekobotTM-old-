const Discord = require("discord.js");
const translate = require('translate');

module.exports.help = {
		name: 'translate',
		description: 'translates smth to a different language',
		useage: 'translate <language to> <language from> <text>'
	}
module.exports.run = async (client, message) => {
		let prefix = "Nb.";
		const txt = message.content.replace( /  +/g, ' ').split(" ").slice(3).join(" ");
		const langto = message.content.replace( /  +/g, ' ').split(" ").slice(1,2).join(" ");
		const langfrom = message.content.replace( /  +/g, ' ').split(" ").slice(2,3).join(" ");

		if(langto == "help")return message.reply('mk ... soo, heres how you use the translate command ... ```'+ prefix +'translate <language to> <language from> <what you wanna translate>``` if you want a list of available languages, please use ``'+ prefix +'translate languages``'); 
		if(!langto)return message.reply('mk ... soo, heres how you use the translate command ... ```'+ prefix +'translate <language to> <language from> <what you wanna translate>``` if you want a list of available languages, please use ``'+ prefix +'translate languages``'); 
		if(langto == 'languages'){
			message.channel.send("sure ... it's a long list, but here's the languages available to translate:\n```\n'az': 'Azerbaijan'\n'sq': 'Albanian'\n'am': 'Amharic'\n'en': 'English'\n'ar': 'Arabic'\n'hy': 'Armenian'\n'af': 'Afrikaans'\n'eu': 'Basque'\n'ba': 'Bashkir'\n'be': 'Belarusian'\n'bn': 'Bengali'\n'my': 'Burmese'\n'bg': 'Bulgarian'\n'bs': 'Bosnian'\n'cy': 'Welsh'\n'hu': 'Hungarian\n'vi': 'Vietnamese'\n'ht': 'Haitian-(Creole)'\n'gl': 'Galician'\n'nl': 'Dutch'\n'mrj': 'Hill Mari'\n'el': 'Greek'\n'ka': 'Georgian'\n'gu': 'Gujarati'\n'da': 'Danish'\n'he': 'Hebrew'\n'yi': 'Yiddish'\n'id': 'Indonesian'\n'ga': 'Irish'\n'it': 'Italian'\n'is': 'Icelandic'\n'es': 'Spanish'\n'kk': 'Kazakh'\n'kn': 'Kannada'\n'ca': 'Catalan'\n'ky': 'Kyrgyz'\n'zh': 'Chinese'\n'ko': 'Korean'\n'xh': 'Xhosa'\n...```");
		} else {
			translate(txt, { from: langfrom, to: langto, engine: 'yandex', key: process.env.YANKEY }).then(text => {
				let gbd = new Discord.RichEmbed()
				.setColor(`${message.member.displayHexColor}`)
				.setTimestamp()
				.addField(`**From: ${langfrom}**`, `${txt}`)
				.addField(`**To: ${langto}**`, `${text}`)
				.setFooter(`Reqested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
				message.channel.send(gbd)
			}).catch(err => {
				return message.channel.send('```'+ err +'```');
				console.error(err);
			});
		}
}
