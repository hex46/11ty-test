const uglifyJS = require("uglify-js");

const fs = require('fs');
const path = require('path');

module.exports = class {
    data() {
        const jsDir = path.join(__dirname, '.');
        const files = fs.readdirSync(jsDir);
        let jsFilenameAndRawJS = {};

        // Doesn't work if the folder contains subfolders
        files.filter(filename => !filename.includes("11ty.js"))
            .forEach(jsFilname => {
            const filePath = path.join(jsDir, jsFilname);
            jsFilenameAndRawJS[jsFilname] = fs.readFileSync(filePath).toString();
        });

        return {
            permalink: `js/main.js`,
            scripts: jsFilenameAndRawJS
        };
    }

    render(data) {
        var result = uglifyJS.minify(data.scripts);
    
        if(result.warnings)
            console.warn(result.warnings);
        if(result.error)
            console.error(result.error);

        return result.code;
    }
}