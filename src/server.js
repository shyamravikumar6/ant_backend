
const envrionment = require('./envrionment');
const express = require('express');
const cors = require('cors');
const app = express();
const Route = require('./routes');
const bodyParser = require('body-parser');
app.use(bodyParser());
app.use(express.json());
app.use(cors());
new Route().route(app);

console.log('bankai');

///module.exports= {client}
app.listen(3006,()=>console.log('listening.....'));