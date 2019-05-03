exports.run = (config, client, message, args) => {
    const m = require("./../../shared/methods.js");
    //--------------------------------------------------------------------



    
    //PUT THE ACTUAL COMMAND THIS POINTS TO HERE:
    var mainCmd = "hi";





    //--------------------------------------------------------------------
    let commandFile = require(`./../${mainCmd}.js`);
    commandFile.run(config, client, message, args);
}