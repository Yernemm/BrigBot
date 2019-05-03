//METADATA
const desc = "Cryptography and base shifts"; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
//Command
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    const alphaCap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    switch (argsArr[0]){
        case "shift":
        case "rot":
        case "caesar":
        if (Number.isInteger(argsArr[1] * 1))
        {
            var shift = argsArr[1]*1;
            var msgBefore = argsTxt.substring(argsArr[0].length + argsArr[1].length + 2);
            var msgNew = "";
            msgBefore.split('').forEach(c =>{
                var upper = (c == c.toUpperCase());
                var pos = alpha.indexOf(c.toLowerCase());
                if (pos == -1){
                    msgNew += c;
                }else{
                    pos = (pos + shift) % alpha.length;
                    if(pos<0)
                    	pos = alpha.length + pos;
                    var newChar = alpha[pos];
                    if(upper)
                    newChar = newChar.toLocaleUpperCase();
                    msgNew += newChar;
                }
            });
            msg = msgNew;

        }else
        {
            msg="Error: Shift is not an integer."
        }

        break;
        default:
        msg = "Error: Invalid crypto mode. Use 'help crypto' for more information."
        break;
    }



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