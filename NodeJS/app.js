const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

let url = "mongodb://localhost:27017/";

// console.log(process.argv) cant figure out how it works :(

csvtojson()
    .fromFile("bestsellers.csv")
    .then(csvData => {
        console.log(csvData);

        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("nodejs_practice")
                    .collection("bestsellers")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });
