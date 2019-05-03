//METADATA
const desc = "Sends an image file for the sent custom emoji."; //Short description of what the command does.
const usage = "<emoji>"; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
//Command
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "Emoji:"; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
    var rgx = /<a?:.+?:([0-9]+?)>/g;
    var rgxAnim = /<a:.+?:([0-9]+?)>/;
    var url = "https://cdn.discordapp.com/emojis/";
    var emojis = [];
    var matches = argsTxt.match(rgx)
    if(matches){
        matches.forEach(e=>{
        console.log(e);        
        var emojiLink = url + rgx.exec(e)[1];
        rgx.exec(e);
        console.log(emojiLink);
        if(rgxAnim.test(e))
        emojiLink += ".gif";
        else
        emojiLink += ".png";
        console.log(emojiLink);
        console.log("---");
       emojis.push(emojiLink);
    })
    console.log(emojis);
    message.channel.send(msg,{
        files: emojis
    })
}else{
    msg="No custom emoji found in message."
    message.channel.send(msg);
}


    //--------------------------------------------------------------------
    //m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    m.log(config, client, message, msg); //Alternative will log msg without sending msg.
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