const express = require('express')
const app = express()
const cors= require('cors')
//set process.env.port for disabling the independant configuration of the port by hosting agents.
const port = process.env.port || 3020
const routes = require('./root_folder/routing/product_routing');
var corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)
require('dotenv').config();


const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})