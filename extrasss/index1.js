const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) =>{
    assert.equal(err, null);

    console.log('Connected ');
    const db = client.db(dbname);

    collection.insertOne({'name':"Uthappizza","description":"test"},
    (err, result)=>
    {
        assert.equal(err, null);

        console.log('After Insert : \n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs)=>{
            assert.equal(err, null);

            console.log('Found : \n');
            console.log(docs);
            db.dropCollection('dishes',(err,result)=>{
                assert.equal(err,null);

                client.close();
            });
        });
    });
});
