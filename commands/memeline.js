
//METADATA
exports.cmdtype = () => {
    return "fun";
}
const desc = "A meme line for one of the ow heroes."; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    const fs = require('fs');
    const Discord = require("discord.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "OwO whats this"; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
    var lines = fs.readFileSync('./yerFiles/memelines.txt', 'utf8').split(m.nl());

    var heroes = m.getAllHeroes();

    var hero = m.randArr(heroes);

    var fHero = hero.toLowerCase().replace(":","").replace(".","").replace(" ", "-");

    var himgLink = `https://d1u1mce87gyfbn.cloudfront.net/hero/${fHero}/hero-select-portrait.png`;

    msg = `${hero}: ${m.randArr(lines)}`;

    const embed = new Discord.RichEmbed()
    .setDescription(msg)
    .setThumbnail(himgLink);

    message.channel.send({embed});
    //message.channel.send(himgLink);

    //--------------------------------------------------------------------
    //m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    m.log(config, client, message, msg); //Alternative will log msg\r without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}