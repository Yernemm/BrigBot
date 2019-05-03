//METADATA
const desc = "Will remind you of the message after a given amount of time."; //Short description of what the command does.
const usage = "<time (number followed by m, h, or d)> [reminder message]"; //Any parameters required for command.
const cmdtype = "utility"; //Type of command
//Command
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    const sqlite = require("sqlite");
    var d = new Date();
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "Setting reminder..."; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
    const rmLimit = 31536000000; //Milliseconds in one year.
    const msgSpecifyUnit = "Specify the unit of time, _m, h,_ or _d_."
    const msgSpecifyTime = "Specify a time";
    const msgReminderTooLong = "Reminder message is too long.";
    const msgTimeTooLong = "The maximum reminder length is 1 year.";

    var minLim = rmLimit / (1000 * 60)
    var houLim = minLim / 60
    var dayLim = houLim / 24


    let t = argsArr[0];
    var tParsed = parseFloat(argsArr[0]);
    if (tParsed) {
        if (t.endsWith("m")) {
            validateTime(60, "minutes");
        } else if (t.endsWith("h")) {
            validateTime(60 * 60, "hours");
        } else if (t.endsWith("d")) {
            validateTime(60 * 60 * 24, "days");
        } else {
            msg = msgSpecifyUnit;
        }
    } else {
        msg = msgSpecifyTime;
    }

    function validateTime(multi, unit) {
        var valid = true;
        switch (unit) {
            case "minutes":
                if (tParsed > minLim)
                    valid = false;
                break;
            case "hours":
                if (tParsed > houLim)
                    valid = false;
                break;
            case "days":
                if (tParsed > dayLim)
                    valid = false;
                break;
        }
        if(valid){
            addTimer(multi, unit);
        }else{
            msg = msgTimeTooLong;
        }
    }

    function addTimer(multi, unit) {
        var lastsMs = parseInt(1000 * multi * parseFloat(argsArr[0]))
        if (lastsMs > rmLimit) {
            msg = msgTimeTooLong;
        }
        else {


            var now = d.getTime();
            var endTime = now + lastsMs;
            var remText = argsTxt.slice(argsArr[0].length + 1);

            if (remText.length <= 1000) {

                const dbp = sqlite.open("./yerFiles/db/reminders.sqlite")
                    .then(sql => {
                        sql.run(`INSERT INTO reminders (timeSet, user, channelID, reminder, timeEnd) VALUES (?, ?, ?, ?, ?)`, [now, message.author.id, message.channel.id, remText, endTime])
                            .then(() => {
                                message.channel.send(`Reminder set for ${parseFloat(argsArr[0])} ${unit}`);
                                sqlite.close(dbp);
                            });
                    });
            } else {
                msg = msgReminderTooLong;
            }
        }
    }



    //--------------------------------------------------------------------
    m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    //m.log(config, client, message, msg); //Alternative will log msg without sending msg.
}
exports.desc = () => {
    return desc;
}
exports.use = () => {
    return usage;
}
exports.cmdtype = () => {
    return cmdtype;
}