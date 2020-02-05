const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const web = require('./routes/web')


app.use(bodyParser.json());
app.use('/',web)

app.listen(process.env.PORT,() => {
    console.log(` LISTEN TO PORT ${process.env.PORT}`)
})