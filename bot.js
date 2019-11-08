const Discord = require('discord.js');
const api = require("nekos-moosik");
const config = require('./config.js');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const prefix = "Nb.";

const client = new Discord.Client();
client.music = new api.musicClient(config.GOOGLE_API_KEY);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const DBL = require("dblapi.js");
client.dbl = new DBL(process.env.DBL_KEY, { webhookAuth: 'O.o-am-rip', webhookPort: 3000 }, client);

let init = async () => {
const cmdFiles = await readdir("./commands/");
  console.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
	client.aliases.set(props.help.alias, props);
  });
  console.log(`loaded ${client.commands.size} commands and ${client.aliases.size} aliases`);
}
function generateKey(length) {
    const tokens = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz123456789._-=+';
    let keyOut = '';
    for (let i = 0; i < length; i++) {
	const random = Math.floor((Math.random() * 65) + 1);
	const char = tokens.charAt(random);
	keyOut += char;
    }
    return keyOut;
}
init();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => {
client.user.setActivity(`on ${client.guilds.array().length} servers with ${client.guilds.reduce((a,b) => a + b.memberCount, 0).toLocaleString()} members`, { type: "PLAYING" });
  setTimeout(game2, 30000)
});

function game1() {
    client.user.setActivity(`on ${client.guilds.array().length} servers with ${client.guilds.reduce((a,b) => a + b.memberCount, 0).toLocaleString()} members`, { type: "PLAYING" });
    setTimeout(game2, 30000)
}

function game2() {
    client.user.setActivity(`join support to help`, { type: "PLAYING" });
    setTimeout(game3, 30000)
}

function game3() {
   client.user.setActivity(`my prefix is Nb.`, { type: "PLAYING" });
    setTimeout(game4, 300000);
}
function game4() {
   client.user.setActivity(`My Master's orders`, { type: "LISTENING" });
    setTimeout(game5, 30000);
}
function game5() {
   client.user.setActivity(`in bed with mustache`, { type: "PLAYING" });
    setTimeout(game1, 30000);
}

client.on('ready', () => {
setInterval(() => {
    client.dbl.postStats(client.guilds.size)
  }, 3600000);
});

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('resume', () => console.log('I have reconnected!'));

client.on('guildMemberAdd', async member => {
	if(member.guild.id === "413921975312842752"){
		const verChannel = client.channels.get('641185570676015114');
		const channel = client.channels.get('413921975312842756');
		const role = member.guild.roles.get('459994150796918785');
		const betaRole = member.guild.roles.get('506279846251462675');
		const code = generateKey(6);
			await verChannel.send('<@'+ member.user.id +'> Please enter the following code to enter the server...\n```'+ code +'```').then(async m => {
			const collected = await verChannel.awaitMessages(m => m.author === member.user && m.content == code, {
				max: 1,
				time: 1000*60*10,//10 minutes
				errors: ['time']
			})
			.then((collected) => {
				collected.first().delete(1000).then(() => {
					m.delete(1000);
				})
				member.addRole(role.id).then(() => {
					channel.send(`<@${member.user.id}> would you like to be a beta tester?`).then(async msg => {
						const reaction1 = await msg.react('✅');//yes
						const reaction2 = await msg.react('❎');//no
						const collector = msg.createReactionCollector((reaction, user) => user.id === member.user.id, {
								time: 1000*60*10  //10 minutes
						});
						collector.on('collect', r => {
					      if (r.emoji.name === '✅'){//:white_check_mark:
						      msg.delete(1000).then(() => {
									member.addRole(betaRole.id);
							        channel.send('Nice, you should be able to see the beta channels now ... oh, and thanks for joining ^~^').then(a => a.delete(10000));
						      })
						  }
					      if(r.emoji.name === '❎') {//:negative_squared_cross_mark:
						      msg.delete(1000).then(() => {
									channel.send('Ok, thanks for joining tho').then(a => a.delete(10000));
						      })
						  }
						})
						collector.on('end', () => {
					      msg.delete(1000);
						}); 
					});
				})
			})
			.catch(err => {
				m.edit(`[Message Time-Out]\n<@377271843502948354> The message has timed out, pls let <@${member.user.id}> into the server`);
			});
			})
		}
    })

client.on('message', async message => { 
	if(message.author.bot)return;
	if(message.channel.type !== "text")return;
	if(!message.content.startsWith(prefix)) return;
    if(message.content.startsWith(prefix) && client.user.presence.status === "invisible"){
	  if(message.author.id !== '377271843502948354')return;
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  const url = message.content.split(" ").slice(1).join(" ");
  const serverQueue = client.music.serverqueue(message.guild.id);
  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  
  
  if (command === `play`||command === 'p') {
      client.music.play(client,message,url);
	}
  if (command === `skip`) {
      client.music.skip(client,message)
        } 
  if (command === `stop`) {
      client.music.stop(client,message);
	}
  if (command === `np`||command === 'nowplaying') {
      client.music.nowplaying(client,message);
	}
  if (command === `queue`||command === 'q') {
	let i = -1;
	let embed = new Discord.RichEmbed()
	.setColor(`${message.member.displayHexColor}`)
	.setFooter(`Total queue size: ${serverQueue.songs.length} songs`)
	.addField("**Now Playing:**", `[${serverQueue.songs[0].title}](https://youtube.com/watch?v=${serverQueue.songs[0].id})`)
	.addField('**Up Next:**', `${serverQueue.songs.length > 1 ? serverQueue.songs.map(song => `**[${++i}] -** ${song.title}`).slice(1, 6).join('\n') : "Nothing"}`)
	client.music.queue(client,message,{
        queueMessage: embed
         });
        }
  if (command === `pause`) {
	client.music.pause(client,message);
        }
  if (command === `resume`) {
	client.music.resume(client,message);
        }
 
let commandfile = client.commands.get(cmd.slice(prefix.length).toLowerCase());
  let alias = client.aliases.get(cmd.slice(prefix.length).toLowerCase());
  if(commandfile){
	  commandfile.run(client,message,args);
  }
  if(alias){
	  alias.run(client,message,args);
  }
});

client.login(config.TOKEN);
