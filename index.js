const Discord = require("discord.js");
const client = new Discord.Client();
const readline = require('readline');
const fs = require("fs");
const puppeteer = require('puppeteer');
const modmail = require("./modmail.js");
var running = true;


const config = require("./config.json");
const m = require("./shared/methods.js");

const logChannelID = config.logChannelID;
const botChannelID = config.botChannelID;

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("guildMemberAdd", (member) => {
  //When new user joins
  m.logNoMsg(config, client, `New user "${member.user.username}#${member.user.discriminator}" with ID \`${member.id}\` [ <@${member.id}> ] joining ${member.guild.name} with guild ID \`${member.guild.id}\``);



});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.channel.type == "dm"){
    //Do mod mail sending from user to mods.
    modmail.sendUserToMods(config, client, message);
  }
  if (message.channel.type != "text") return;
  //if (message.content.indexOf(config.prefix) !== 0) return;
  if (message.content.startsWith(".")) return;
  if(message.channel.id == config.mailChannelID){
    //Do mod mail sending from mods to user.
    modmail.sendModsToUser(config, client, message);
  }

  if (message.channel.id == botChannelID) { //Check if in assistant channel.
    // This is the best way to define args. Trust me.
    const argsArr = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = argsArr.shift().toLowerCase().replace(/[^a-zA-Z ]/g, "");
    const argsTxt = message.content.slice(config.prefix.length + command.length).trim();
    const extraData = "";

    // The list of if/else is replaced with those simple 2 lines:
    try {

      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(config, client, message, argsArr, argsTxt, extraData);
    } catch (err) {

      var err1 = "```" + err.stack + "```";
      var rawErr1 = err;
      try {

        let commandFile = require(`./commands/alias/${command}.js`);
        commandFile.run(config, client, message, argsArr, argsTxt, extraData);
      } catch (err) {
        var err2 = "```" + err + "```";
        var rawErr2 = err;

        if (rawErr2.code == 'MODULE_NOT_FOUND' && rawErr1.code == 'MODULE_NOT_FOUND') {
          //Command not found
          //Give random fact instead.
            message.channel.startTyping();
          cleverbotSend(argsArr, res =>{
            console.log(">Response: " + res);
            message.channel.send(res);
            message.channel.stopTyping();
            
            
          })

          //


        } else {
          var msg = `***Some error occured!***\r\n<@${config.ownerID}> Check the logs for the detailed error message and fix it!!`;
          message.channel.send(msg);
          msg += "\r\n\r\nERR1:\r\n" + err1;
          msg += "\r\n\r\nERR2:\r\n" + err2;
          m.log(config, client, message, msg, "e");
        };


      }
    }

    //console.error(err1);
  }
});






function cleverbotSend(message, callback){
    (async () => {
      lgp("Opening browser...");
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
      lgp("Opening new tab...");
      const page = await browser.newPage();
      lgp("Setting viewport...");
      await page.setViewport({width: 1920, height: 1080});
      lgp("Loading CleverBot website...");
      await page.goto('https://www.cleverbot.com/', {waitUntil: 'networkidle2', timeout: 0});
      //await page.setRequestInterception(true);
      lgp("Sending message...");
      var messageToSend = message
  
      page.evaluate(function(botmsg){
        document.querySelector('form[id="avatarform"] > input[name="stimulus"]').value = botmsg;
        cleverbot.sendAI();
    }, message);
  
  
      lgp("Intercepting response...");
      page.on('response', response => {
        //console.log(interceptedRequest.url());
        var alreadyFound = false;
        if(response.url().startsWith("https://www.cleverbot.com/webservicemin?")){
          //console.log("==================================");
          if(!alreadyFound)
          lgp("Response found...");
  
          //IT TOOK ME WAYYY TOO LONG TO WORK OUT THESE ARE SEPARATED BY '\r'
          //I'm keeping the debug code commented instead of deleting, as a reminder of my incompetence.
  
         // console.log(response.status());
          response.text().then(r =>{

            
  
  
            if(r != "OK\n"){
              alreadyFound = true;
              callback(r.split("\r")[0]);
              lgp("Closing browser...");
      browser.close().then(()=>{lgp("Done!");});
              }
          }).catch();
          
          //console.log("==================================");
        }
  
      });
  

  
     
  
      
      })();
  }

  function lgp(msg){
    console.log("================" + msg);
  }

client.login(config.token);