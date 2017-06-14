const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const stuff = ['1', '2', '3']

app.get('/calculate', (req, res) => {
    res.send(stuff);
})

app.listen(3001, function() {
    console.log('server started');
})