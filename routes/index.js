const fs = require("fs");

module.exports = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === "index.js" || file === "auth.js") { //these are special files that aren't routes
            return;
        }
        let fileName = file.substr(0, file.indexOf('.'));
        app.use("/api/" + fileName , require("./" + fileName)); //assumes fileName is name for route too
    });
}