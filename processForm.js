const express = require("express");
const bodyParser = require("body-parser");
var path = require('path')

const mongoose = require("mongoose");
// const uri = "mongodb+srv://jenniferw:Wsnx1c9J0sKO6sO3@equities.smk0n2x.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'error:'));
// db.once('open', () => {
//     console.log("Succesfully connected!");
// })

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
    // return res.redirect('index.html');
}).listen(3000);

app.post('/process', (req, res) => {
    var query = req.body.query;
    console.log(query);
})

app.listen(3000);