const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
var __dirname = path.resolve();

const mongodb = require('mongodb');

const uri = "mongodb+srv://jenniferw:Wsnx1c9J0sKO6sO3@equities.smk0n2x.mongodb.net/?retryWrites=true&w=majority";

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/process', (req, res) => {
    var query = req.body.query;
    var queryType = req.body.queryType;
    console.log(typeof queryType);
    queryDb(query, queryType).catch(console.dir);
    // const processResult = queryDb(query, queryType);
    // console.log(processResult);
    res.send("Success!");
})

app.listen(3000);


const client = new mongodb.MongoClient(uri);

async function queryDb(query, queryType) {
    try {
        const db = client.db("equities");
        const equities = db.collection("equities");

        const queryObj = {[queryType]: query};
        const resultCursor = equities.find(queryObj);

        if((await resultCursor.count()) === 0) {
            console.log("No documents found")
        }

        await resultCursor.forEach(console.dir);
    } finally {
        await client.close();
    }
}

// function queryDb(query, queryType) {
//     const queryObj = {query: queryType};
//     console.log("querydb is passed: ", query, " ", queryType);
//     var data = null;
//     mongodb.MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
//         if (err) {
//             throw err;
//         }
//         var db = client.db("equities");

//         const findResult = db.collection("equities").find(queryObj);
//         findResult.forEach(console.dir);

//         // cursor.forEach((x)=> {
//         //     console.log(x);
//         //     data = x
//         // });
//         client.close();
//         });
//     return data;
// }

