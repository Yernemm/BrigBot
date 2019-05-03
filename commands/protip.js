//METADATA
const desc = "Gives a random joke pro tip"; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = "fun"; //Type of command
//Command
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "Pro tip: "; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
    const fs = require('fs');
    var p1 = m.randArr(fs.readFileSync('./yerFiles/protip/adve1.txt', 'utf8').split(m.nl()));
    var p2 = m.randArr(fs.readFileSync('./yerFiles/protip/verb1.txt', 'utf8').split(m.nl()));
    var p3 = m.randArr(fs.readFileSync('./yerFiles/protip/noun1.txt', 'utf8').split(m.nl()));
    var p4 = m.randArr(fs.readFileSync('./yerFiles/protip/rest1.txt', 'utf8').split(m.nl()));


    msg += `${p1} ${p2} ${p3}${p4}`;

    //--------------------------------------------------------------------
    m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
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