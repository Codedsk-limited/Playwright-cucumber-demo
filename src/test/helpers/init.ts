const fs = require("fs-extra")

//create report folder if there is no folder with the name of report
try {
    fs.ensureDir("report")
    fs.emptyDir("report")

}catch(error) {
    console.log("Folder not created!" + error)
}