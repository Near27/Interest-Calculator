const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const gbp = ['0.49246', '0.69714'];
const usd = ['2.03032', '1.41544'];
const eur = ['1.43448', '0.70641'];

app.get('/calculate/:currency', (req, res) => {
    if(req.params.currency.match('gbp')) {
        res.send(gbp);
    } else if(req.params.currency.match('usd')) {
        res.send(usd);
    } else {
        res.send(eur);
    }
})

app.listen(3001, function() {
    console.log('server started');
})