const Discord = require("discord.js");
const m = require("./shared/methods.js");

exports.sendUserToMods = (config, client, message) => {

    let attachments = message.attachments;

    const embed = new Discord.RichEmbed()
            .setAuthor(message.author.username + "#" + message.author.discriminator, client.user.avatarURL)
            .setTitle("New Mod Mail:")
            .setThumbnail(message.author.avatarURL)
            .setColor(0xf44242)
            .setTimestamp()
            .setDescription(message.content)
            .addField("User info:", `Name: ${message.author.username}#${message.author.discriminator}\nID: ${message.author.id}\n`);
            let userId = message.author.id;
            
                sendTheMsg(client.channels.get(config.mailChannelID), message, embed, userId)
            .then(() => {
                message.channel.send("**Message has been passed on to the mods!**\r\nPlease wait for a reply before sending more messages.")
            }).catch();
            

};

exports.sendModsToUser = (config, client, message) => {
    let attachments = message.attachments;
    let userId = message.content.split(" ")[0];
    let msgToSend = message.content.slice(userId.length + 1);
    if(msgToSend.length < 1){
        message.channel.send("Message too short.");
    }else{


    let user = message.guild.fetchMember(userId)
    .then(u =>{
        //User found.
        
        const embed = new Discord.RichEmbed()
        .setAuthor("Brigitte Mains Mod Team", client.user.avatarURL)
        .setTitle("Mod Mail Message:")
        .setThumbnail(message.guild.iconURL)
        .setColor(0x3e96e8)
        .setTimestamp()
        .setDescription(msgToSend);




        sendTheMsg(u, message, embed, "")
        
        .then(() => 
        sendTheMsg(message.channel, message, embed, `Sent to <@${userId}> :`)
        .then().catch()
    )
        .catch();

    })
    .catch(e =>{
        //User not found or error.
        message.channel.send(`User with ID '${userId}' not found.`)
        console.error(e);
    })

}
}

function generateMessage(message, embed, text){

    

if(message.attachments.array().length > 0){
    console.log("Sent File");
    let attachmentArray = [];
    message.attachments.forEach(a => attachmentArray.push(a.url));
    return (text, {embed, files: attachmentArray})
}else{
    return (text, embed);
}

}

function sendTheMsg(channel, message, embed, text){

    if(message.attachments.array().length > 0){
        console.log("Sent File");
        let attachmentArray = [];
        message.attachments.forEach(a => attachmentArray.push(a.url));
        return channel.send(text, {embed, files: attachmentArray})
    }else{
        return channel.send(text, embed);
    }

}