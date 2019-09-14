const express = require('express');
const loader = require('./loader');
const parser = require('./parser');

const app = express();
const port = 8443;

app.get('/top10wordsB/:twoLetters', (req, res) => {
    if (req.params['twoLetters'].length !== 2) {
        res.status(412).json({'error': 'path param should have length 2'});
    } else {
        parser.parse_data(loader.load_content('christmas_carol.txt'), req.params['twoLetters'])
            .subscribe(body => {
                res.status(200).json(body);
            });
    }
});

app.listen(port, () => {
    console.log(`backend started on port ${port}`);
});
