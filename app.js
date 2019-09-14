const express = require('express');

const app = express();
const port = 8443;

app.get('/top10wordsB/:twoLetters', (req, res) => {
    console.log(req.params['twoLetters']);
    res.send(req.params['twoLetters']);
});

app.listen(port, () => console.log(`backend started on port ${port}`));
