const express = require('express');
const app = express();
const port = 2000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', (req,res) => {
    res.status(200).send(`<h1>API is Working :)</h1>`)
});

const {
    inventoryRouter,
    storeRouter,
    productRouter
} = require('./router');

app.use('/inventory', inventoryRouter);
app.use('/store', storeRouter);
app.use('/product', productRouter);

app.listen(port, () => console.log(`API is active at port ${port}`));