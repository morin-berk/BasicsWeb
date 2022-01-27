const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const readline = require('readline-sync')
const name = readline.question('enter csv file name')

let url = "mongodb://localhost:27017/";

csvtojson()
    .fromFile(name)
    .then(csvData => {
        console.log(csvData);

        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("nodejs_practice")
                    .collection("my_collection")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;
                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });
