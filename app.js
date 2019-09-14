const express = require('express');
const loader = require('./loader');
const parser = require('./parser');

const app = express();
const port = 8443;

app.get('/top10wordsB/:twoLetters', (req, res) => {
    console.log(req.params['twoLetters']);
    parser.parse_data(loader.load_content('christmas_carol.txt'), req.params['twoLetters'])
        .subscribe(body => {
            console.log(body);
            res.status(200).json(body);
        });
});

app.listen(port, () => {
    console.log(`backend started on port ${port}`);
});
