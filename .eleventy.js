const yaml = require("js-yaml");

module.exports = function(e) {

    // copy 'assets' folder
    e.addPassthroughCopy("assets");
    // read YAML data from 'data' folder
    e.addDataExtension("yml", contents => yaml.safeLoad(contents));

    return {
        dir: {
            output: "build",
            includes: "includes",
            layouts: "layouts",
            data: "data"
        }
    };
};