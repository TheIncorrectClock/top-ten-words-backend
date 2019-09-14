const fs = require('fs');

function load_content(filename) {
    return fs.readFileSync(filename);
}

module.exports = {
    load_content
};
