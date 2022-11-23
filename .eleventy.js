const yaml = require("js-yaml");

module.exports = function(e) {
    // copy 'assets' folder
    e.addPassthroughCopy("src/assets");
    // read YAML data from 'data' folder
    e.addDataExtension("yml", contents => yaml.load(contents));

    return {
        dir: {
            input: "src",
            output: "build",
            includes: "includes",
            layouts: "layouts",
            data: "data"
        }
    };
};