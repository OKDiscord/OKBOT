const Discord = require("discord.js");
const axios = require('axios');
const client = new Discord.Client();
const fs = require('fs');
const prefix = "!ok";
var isReadyHudba = true;
var isReadyCasino = true;
const warns = require("C:/Users/Oksus/Desktop/OKBOT/warns.json");
const catalogEmbed = new Discord.MessageEmbed()
	.setColor('#b23bf0')
	.setTitle('Katalog:')
	.setThumbnail('https://i.imgur.com/0ssZSyF.png')
	.addFields(
		{ name: 'VIP - 80000', value: 'Prémiový vzhled i emoji' },
	)
	.setFooter("Itemy sa kupuje pomocou !buy-item <množstvo> <názov>\nItemy sa predávajú pomocou !sell-item <množstvo> <názov>\nNezabudnite vaše itemy potom mimo kanál shop použíť pomocou !use-item <množstvo> <názov>")
const helpEmbed = new Discord.MessageEmbed()
    .setColor('#b23bf0')
	.setTitle('Help')
	.addFields(
		{ name: '!ok clear', value: '!ok clear <číslo do 98> vyčistí dané množství zpráv.' },
		{ name: '!ok kick', value: '!ok kick <@uživatel> <důvod> vyhodí uživatele.' },
		{ name: '!ok ban', value: '!ok ban <@uživatel> <důvod> zabanuje uživatele.' },
		{ name: '!ok warn', value: '!ok warn <@uživatel> <důvod> varuje uživatele.' },
		{ name: '!ok cw', value: '!ok cw <@uživatel> vyčistí varování uživatele.' }
	
	)
	.setFooter('OKBOT 1.3, napsaný Simírem Gerchánem 2020.')
const commandy = [
  "kick", 
  "clear", 
  "help", 
  "ban", 
  "warn",
  "cw",
  "donate",
  "meme"
];
const autoDel = [
  "689052426233446405",
  "693845775137898506",
  "689853608375746611",
  "696655792832774174"
];
const okList = [
  "C:/Users/Oksus/Desktop/OKBOT/1.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/2.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/3.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/4.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/5.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/6.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/7.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/8.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/9.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/10.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/11.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/12.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/13.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/14.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/15.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/16.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/17.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/18.mp3",
  "C:/Users/Oksus/Desktop/OKBOT/19.mp3"
];
var Okeyko = 0;
const pozdravy = [
  "čau",
  "čus",
  "ahoj",
  "cus",
  "cau",
  "cc",
  "c",
  "zdar",
  "nazdar",
  "zdarec",
  "cs",
  "zdravím",
  "zravim"
];
const pozdrZpet = [
  "Nazdar",
  "Čus",
  "Ahoj",
  "Zdar",
  "Zdarec",
  "Dobrej Den",
  "Čusák Mejrusák",
  "Čusák Oksusák",
  "Dobrý Deň",
  "Čuus",
  "Zdravím"
];
const premiumEmoji = [
  "<:emoji_9:689490352889004169>",
  "<:emoji_8:689490240695828544>",
  "<:emoji_22:689604116376584249>",
  "<:emoji_19:689493500965814331>",
  "<:emoji_18:689493255850819585>",
  "<:emoji_13:689491149802700894>",
  "<:emoji_10:689490472804286518>",
  "<:okbot:689219112278163463>"
];
const premiumGif = [
  "https://cdn.glitch.com/0e8cb673-7df0-4335-9edf-3cc3bd81cbb4%2FniggaYes.gif?v=1584557038700",
  "https://cdn.glitch.com/0e8cb673-7df0-4335-9edf-3cc3bd81cbb4%2FdestinyYes.gif?v=1584557038815",
  "https://cdn.glitch.com/0e8cb673-7df0-4335-9edf-3cc3bd81cbb4%2Fzombiew.gif?v=1584557045725",
  "https://cdn.glitch.com/0e8cb673-7df0-4335-9edf-3cc3bd81cbb4%2Fovce.gif?v=1584557050918",
  "https://cdn.glitch.com/0e8cb673-7df0-4335-9edf-3cc3bd81cbb4%2Fviliger.gif?v=1584557051523",
  "https://cdn.glitch.com/0e8cb673-7df0-4335-9edf-3cc3bd81cbb4%2Fauschwitz.gif?v=1584557079160",
];
const premiumRoleId =[
  "689909531341225984",
  "689909526651994249",
  "689909517886291980",
  "689909530053705882",
  "689909525779972168",
  "689909528493424707"
];
function clearWarns(id){
	warns[id] = {
		warns: 0
	}
	fs.writeFile("C:/Users/Oksus/Desktop/OKBOT/warns.json", JSON.stringify(warns), (err) => {
	  if(err) console.log(err);	
	})
}
function diff(a1, a2) {
  var result = [];
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result.push(a1[i]);
    }
  }
  return result;
}
/*async function fetchNewestVideo(){
    const fetch = await axios({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: "GET",
        params: {
          part: "snippet",
          channelId: "UCIq1xWC7JzFDYmHS-3-N1OQ",
          maxResults: 1,
          order: "date",
          type: "video",
          key: "AIzaSyBLTGsn-F2MLtvbPVXA06Kk1rXRTbBtVWs",
          pageToken: ""

        }
      })
      const video = fetch.data.items[0].snippet
      fs.exists("C:/Users/Oksus/Desktop/OKBOT/yt_newest_video.json", (exists) => {
          if(exists){
              fs.readFile("C:/Users/Oksus/Desktop/OKBOT/yt_newest_video.json", "utf8", (error, data) => {
                  if(error) console.log(error);
                  else{
                      if(JSON.stringify(video.publishedAt) != JSON.stringify(data.publishedAt)){
                          const ytNews = Okeyko.channels.cache.find(ch => ch.id == "623603388247965697");
						  ytNews.send(`Čest, Oksus vydal nové video!\nPodívej se na něj zde: https://youtube.com/watch?v=${fetch.data.items[0].id.videoId}`);
                      }
                  }
              });
          }
          else{
              fs.writeFile("C:/Users/Oksus/Desktop/OKBOT/yt_newest_video.json", JSON.stringify(video), "utf8", (error) => {
                if (error) console.log(error);
              });
          }
      });
      setTimeout(fetchNewestVideo, 120000);
}*/

 


client.once("ready", () => {
  console.log("Ready!");
  client.user.setActivity("!ok help", {type: "WATCHING"}); 
  Okeyko = client.guilds.cache.find(gu => gu.id === "554354186268180501");
  fetchNewestVideo(Okeyko);
});

client.login("Njg3MzU3NjM5MjYwMzczMDIx.XtOBCw.nyEF9Bvu1ah2BHoUsTrlOvC9fuI");

client.on("guildMemberAdd", member => {
  member.guild.channels.cache.find(ch => ch.id === "694310314644209696").setName("Členovia Okeyka:" + member.guild.memberCount);
  const welcChan = member.guild.channels.cache.find(
    ch => ch.id === "689403521967456285"
  );
  welcChan.send(
    "<@" +
      member.id +
      ">, vítaj na serveru Okeyko! Prečítaj si pravidla a skús sa podľa nich riadiť"
  );
});
client.on("guildMemberRemove", member => {
  member.guild.channels.cache.find(ch => ch.id === "694310314644209696").setName("Členovia Okeyka:" + member.guild.memberCount);
  const leaveChan = member.guild.channels.cache.find(
    ch => ch.id === "689403521967456285"
  );
  leaveChan.send(member.user.username + " opustil Okeyko! :sob:");
});

client.on("message", message => {
        
  if (message.content.startsWith(prefix)){
   var argumenty = message.content.slice(prefix.length+1).split(' ');
   var command = argumenty.shift().toLowerCase();
   var argument = argumenty[0];
  if(commandy.indexOf(command) == -1){
    message.reply("toto není příkaz!");
  }
  else{
    switch(commandy.indexOf(command)){
	  case 0:
	    var victim = message.mentions.members.first();
		if(!victim){
			break;
		}
		else{
        var kicker = message.member;
		var kickerId = message.author.id;
		if (!kicker.hasPermission("KICK_MEMBERS")) {
          message.channel.send("Hej! Ty nemôžeš kickovať členov, <@" + kickerId + ">");
        }    
	    else if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
          message.channel.send("Je mi líto <@" + kickerId + ">, bojím sa, že to nemôžem urobiť.");
        } 
	    else {
          if(victim.kickable == false){
			message.reply("tohoto uživatele nemůžu vyhodit!");  
		  }
		  else if (victim.kickable == true) {
			var useLess = argumenty.shift();
			message.channel.send("<@" + victim + "> byl/a kicknut/a! Zodpovědný uživatel: <@"+kickerId+">! Důvod: "+argumenty.join(" "));
            message.channel.send({ files: ["C:/Users/Oksus/Desktop/OKBOT/img/kik.png"] });
		    victim.send("Ahoj! Vypadá to, že jsi byl/a kicknut/a ze serveru Okeyko! Pokud tě znovu pozveme, chovej se slušně a přečti si pravidla!").catch(console.log("Nemohl jsem poslat zprávu. Ale je to OK."))
		    victim.kick();
          }
		  

        }
		}
		break;
	  case 1:
	     var cleaner = message.member;
		 var cleanerId = message.author.id;
         if (!cleaner.hasPermission("MANAGE_MESSAGES")) {
           message.channel.send("Hej! <@" + cleanerId + ">, ty nemôžeš čistiť chat!");
         } 
	     else {
		   if(!argument){break;}
		   else{
           message.channel.send("Čistím " + argument + " zpráv.");
           var cleanInt = Number(argument);
           setTimeout(function() {
             message.channel.bulkDelete(cleanInt + 2).catch(message.channel.bulkDelete(2));
           }, 1000);
		   }
         }
		 break;
	  case 2:
	    message.channel.send(helpEmbed);
		break;
	  case 3:
	    var victimBan = message.mentions.users.first();
		if(!victimBan){
			break;
		}
		else{
		var victimBanMember = message.mentions.members.first();
        var banMan = message.member;
		var banManId = message.author.id;
		if (!banMan.hasPermission("BAN_MEMBERS")) {
          message.channel.send("Hej! Ty nemôžeš banovať členov, <@" + banManId + ">");
        }    
	    else if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
          message.channel.send("Je mi líto <@" + banManId + ">, bojím sa, že to nemôžem urobiť.");
        } 
	    else {
          if(victimBanMember.bannable == false){
			message.reply("tohoto uživatele nemůžu zabanovat!");  
		  }
		  else if(victimBanMember.bannable == true) {
			var useLess = argumenty.shift();
			message.channel.send("<@" + victimBanMember + "> byl/a bannut/a! Zodpovědný uživatel: <@"+banManId+">! Důvod: "+ argumenty.join(" "));
            message.channel.send({ files: ["C:/Users/Oksus/Desktop/OKBOT/img/ban.png"] });
		    victimBanMember.send("Ahoj! Vypadá to, že jsi byl/a bannut/a ze serveru Okeyko! Pokud tě znovu pozveme, chovej se slušně a přečti si pravidla!").catch(console.log("Nemohl jsem poslat zprávu. Ale je to OK."));
		    message.guild.members.ban(victimBan);
			
          }        
		}
		}
        break;
      case 4:
        var warnId = message.mentions.members.first();
        var warner = message.member;
        const warnChan = message.guild.channels.cache.find(
          ch => ch.id === "687332179793149960"
        );
		if(!warner.hasPermission("KICK_MEMBERS")){
			message.reply("ty nemůžeš varovat lidi!");
		}
		else{
			var useLess = argumenty.shift();
		    if(!warns[warnId]){
				warns[warnId] = {
					warns: 1
				}
				fs.writeFile("C:/Users/Oksus/Desktop/OKBOT/warns.json", JSON.stringify(warns), (err) => {
				  if(err) console.log(err);	
				})
				warnChan.send("<@"+warnId+"> byl varován uživatelem <@"+message.author.id+">! Důvod: "+argumenty.join(" ")+" Počet varování: "+warns[warnId].warns);
			    warnId.send("Ahoj! Vypadá to, že jsi byl/a varován/a! Přečti si pravidla a příště se chovej slušně!").catch(console.log("Nemohl jsem poslat zprávu. Ale je to OK."));
			}
			else if(warns[warnId].warns == 2){
				message.channel.send("Tento uživatel byl vyhozen za 3 varování.");
				warnId.send("Ahoj! Vyhodili jsme tě za 3 varování. Pokud tě znovu pozveme, chovej se slušně!");
				setTimeout(function(){
				warnId.kick();
				}, 5000);
				clearWarns(warnId);
				break;
			}
			else{
				var newWarns = warns[warnId].warns + 1;
				warns[warnId] = {
					warns: newWarns
				}
				fs.writeFile("C:/Users/Oksus/Desktop/OKBOT/warns.json", JSON.stringify(warns), (err) => {
				  if(err) console.log(err);	
				})
				warnChan.send("<@"+warnId+"> byl varován uživatelem <@"+message.author.id+">! Důvod: "+argumenty.join(" ")+" Počet varování: "+warns[warnId].warns);
			    warnId.send("Ahoj! Vypadá to, že jsi byl/a varován/a! Přečti si pravidla a příště se chovej slušně!").catch(console.log("Nemohl jsem poslat zprávu. Ale je to OK."));
			}
		}
		break;
	  case 5:
	    if (!message.member.hasPermission("ADMINISTRATOR")){
			message.reply(" ty nesmíš čistit varování lidem!");
		}
		else{
			var clearedId = message.mentions.members.first();
			clearWarns(clearedId);
			message.reply(" varování uživatele <@"+clearedId+"> byly vyčištěny!");
		}
	   break;
      case 6:
        message.channel.send("Budeme radi za malí prispevok zde: https://keepme.live/u/oksus.");
        break;
      case 7:
		sendRandomRedditPost(message);
		break;
	}
  }
}
  if(message.author.id != 687357639260373021&&message.content.toLowerCase().includes("oksus"||"oksusi")){
	  var Oksus = client.users.cache.get('513009466397163532');
	  Oksus.send("Oksusi, potrebuje ťa 「"+message.author.username+"」");
  }
  var msg = message.content;
  var msgMemb = message.member;
  var i = 0;
  if(message.member){
  if(message.content.startsWith("http") && !message.member.hasPermission("EMBED_LINKS") && message.channel != 693845775137898506){
	  message.channel.send("Promiň, <@"+message.author.id+">, ale ty nesmíš posílat linky!").then(message => {
		  message.delete({timeout: 6000});
	  });
	  message.delete({timeout : 3000});
  }
  }
 for (var p = 0; p < premiumEmoji.length;p++) {
  if (message.content.includes(premiumEmoji[p])&&!msgMemb.roles.cache.some(role => role.id === "689050904074256485") &&!msgMemb.roles.cache.some(role => role.id === "690881522064162866")) {
    message.delete({timeout:3000});
    message.channel.send("Je mi líto, <@"+message.author.id+">, ale dokud si nekoupíš roli VIP nebo Emoji tak tyto emoji nebudeš moci používat.").then(message=>{
      message.delete({timeout: 6000});
    });
	break;
  }
 }
 
 
  
  if (pozdravy.indexOf(msg.toLowerCase()) != -1) {
    var pozdravitel = message.author.id;
    var pozdrav = pozdrZpet[Math.round(Math.random() * 6)];
    message.channel.send(pozdrav + ", <@" + pozdravitel + ">").then(message => {
      message.delete({ timeout: 30000 });
    });
  }
  
  if(autoDel.indexOf(message.channel.id) != -1 && message.author.bot == false ){
	  switch(autoDel.indexOf(message.channel.id)){
		  case 0:
		   message.reply(" Vaša objednávka bola zpracovaná!");
		   setTimeout(function(){
		     message.channel.bulkDelete(100);  
	       }, 5000);
		   setTimeout(function(){
			  message.channel.send({ files: ["C:/Users/Oksus/Desktop/OKBOT/img/shop.gif"] });
			}, 6000);
		   setTimeout(function(){
			message.channel.send(catalogEmbed);
		   }, 12000);
		   break;
		  case 1:
		   setTimeout(function(){
		     message.channel.bulkDelete(100);  
	       }, 3600000);
		   if(isReadyHudba == true){
		    const hudChan = message.guild.channels.cache.find(
             ch => ch.id === "693845775137898506"
           );
		   isReadyHudba = false;
		   setTimeout(function(){
			   hudChan.send({ files: ["C:/Users/Oksus/Desktop/OKBOT/img/hudba.gif"] });
			  setTimeout(function(){
				  hudChan.send("!play nebo >play písničku spustí, !skip nebo >skip ji přeskočí.");
				  isReadyHudba = true;
			  }, 6000)
		   }, 3600000);
		   }
		   break;
		  case 2:
		   setTimeout(function(){
		     message.channel.bulkDelete(100);  
	       }, 5000);
		   setTimeout(function(){
			  message.channel.send({ files: ["C:/Users/Oksus/Desktop/OKBOT/img/work.gif"] });
		   }, 6000);
		   break;
		  case 3:
		   setTimeout(function(){
		     message.channel.bulkDelete(100);  
	       }, 3600000);
		   if (isReadyCasino == true){
		   const casChan = message.guild.channels.cache.find(
             ch => ch.id === "696655792832774174"
           );
		   isReadyCasino = false;
		   setTimeout(function(){
			  casChan.send({ files: ["C:/Users/Oksus/Desktop/OKBOT/img/casino.gif"] });
		      isReadyCasino = true;
		   }, 3600000);
		   }
		   break;
		   
	  }
  }
   




});
 

client.on("guildMemberUpdate", async(oldMember, newMember) =>{
  const nRoles = newMember.roles.cache.keyArray();
  const oRoles = oldMember.roles.cache.keyArray();
  const novaRole = diff(nRoles,oRoles);
    const obChan = newMember.guild.channels.cache.find(
    ch => ch.id === "554354186922360845"
  );

 if (689050904074256485 == novaRole){
	newMember.user.send("Ahoj, <@"+newMember.id+">, děkujeme za tvou koupi role VIP!");
  }
  else if (674524861544005633 == novaRole){
	newMember.user.send("Ahoj, <@"+newMember.id+">, stal si sa členom Okeyka! Nezabudni si prečítať pravidlá.\nPokiaľ máš záujem môžeš si prevziať tvoj Free Balík : https://uloz.to/tamhle/5KFZIzROpllN");
  }

});


async function sendRandomRedditPost(message)
{
    const fetch = await axios({
        url: "https://www.reddit.com/r/Okeyko.json",
        method: "GET",
      })
    const guild =  fetch.data;

    let post = randomPost(guild.data.children)
    if (post !== null) {
        if (post.data.selftext !== null) {
            if (post.data.selftext === "A place for members of r/Okeyko to chat with each other") {
                sendRandomRedditPost()
            } else {
                if (post.data.url !== null && post.data.url.startsWith("https://i.redd.it/")) {
                    if (message === null || message === undefined) {
						console.log("Couldn't send the reddit post because the message is null!")
					} else {
						message.channel.send(post.data.url)
					}
				
                } else {
                    sendRandomRedditPost()
                }
            }
        } else {
            sendRandomRedditPost()
        }
    } else {
        sendRandomRedditPost()
    }
}
function randomPost(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
