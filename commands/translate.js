//METADATA
const desc = "Translates the message between two languages. Specify the languages first and then the message. The language is a two-letter code (e.g. 'en' for English). Alternatively, use 'auto' to detect the language to translate from. You can also simply use 'a' which will detect the language and then translate to English."; //Short description of what the command does.
const usage = "<lang from> <lang to> <message> OR a <message> "; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
//Command
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
	const Discord = require("discord.js");
	const trColour = 0x47bae0;
	
	const translate = require('google-translate-api');
	if(argsArr.length < 2){
		//error
		m.logSend(config, client, message, "Specify the correct information. Use 'help translate' for more info.");
	}else{
		var tfr = argsArr[0];
		var tto = argsArr[1];
		var tra = argsArr.slice(2).join(" ");
		if(argsArr[0] == "a"){
			tfr = "auto";
			tto = "en";
			tra = argsArr.slice(1).join(" ");
		}
 
translate(tra, {from: tfr, to: tto}).then(res => {
	
    //console.log(res.text);
    //=> I speak English
    //console.log(res.from.language.iso);
	
    //=> nl
	msg = res.text;
	if(msg.length >2048){
		msg = msg.slice(0,2044) + "...";
	}
	
	const embed = new Discord.RichEmbed()
	.setColor(trColour)
	.setAuthor(message.guild.member(message.author).displayName, message.author.avatarURL)
	.setTitle("Translated from " + res.from.language.iso + " to " + tto)
	.setDescription(msg);
	message.channel.send({embed});
	m.log(config, client, message, msg);
}).catch(err => {
	message.channel.send(err.toString());
	m.log(config, client, message, err);
});

	};

    //--------------------------------------------------------------------
    //m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    //m.log(config, client, message, msg); //Alternative will log msg without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}
exports.cmdtype = () => {
    return cmdtype;
}