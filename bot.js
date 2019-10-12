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
const dbl = new DBL(process.env.DBL_KEY, { webhookAuth: 'O.o-am-rip', webhookPort: process.env.PORT }, client);

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
    dbl.postStats(client.guilds.size)
  }, 3600000);
});

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('resume', () => console.log('I have reconnected!'));

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
