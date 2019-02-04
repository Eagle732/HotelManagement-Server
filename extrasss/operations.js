const assert = require('assert');

exports.insertDocument = (db, documents, collection, callback)=>{
    const coll = db.collection(collection);
    // coll.insert(documents, (err, result) => {
    //     assert.equal(err, null);
    //     console.log("Inserted " + result.result.n +
    //         " documents into the collection " + collection);
    //         callback(result);
    // });
    return coll.insert(documents);
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    // coll.find({}).toArray((err, docs) => {
    //     assert.equal(err, null);
    //     callback(docs);
    // });
    return coll.find({}).toArray();
};

exports.removeDocument = (db, documents, collection, callback) => {
    const coll = db.collection(collection);
    // coll.deleteOne(documents, (err, result) => {
    //     assert.equal(err, null);
    //     console.log("removed the document ", documents );
    //     callback(result);
    // });
    return coll.deleteOne(documents);
};

exports.updateDocument = (db, documents, update,collection, callback)=>{
    const coll = db.collection(collection);
    // coll.updateOne(documents, {$set:update}, null,(err,result) => {
    //     assert.equal(err, null);
    //     console.log("Updated the document with " + update);
    //     callback(result);
    // });
    return coll.updateOne(documents, {$set:update}, null);
};
