var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/vinni";
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var mydb= db.db("vinni")
 mydb.dropDatabase()
 var collection = mydb.collection("cats")
 collection.insertOne({name:"Pushok"},function(){
 console.log("Cats collection creation")
 db.close()
 })
});
