var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fivepage')
  var Hero = require("./models/hero").Hero
  var async = require("async")


  mongoose.connection.on("open",function(){
   var db = mongoose.connection.db
   db.dropDatabase(function(err){
   if(err) throw err
   console.log("Ok")
   //ЗДЕСЬ БУДУТ ДОБАВЛЕНЫ ГЕРОИ
   async.parallel([
 function(callback){
       var pig = new Hero({nick:"pig"})
       pig.save(function(err,result){
       callback(err,result)
 })
 },
 function(callback){
       var vinni = new Hero({nick:"vinni"})
       vinni.save(function(err,result){
       callback(err,result)
 })
 },
 function(callback){
       var rabbit = new Hero({nick:"rabbit"})
       rabbit.save(function(err,result){
       callback(err,result)
 })
 },
 function(callback){
       var sova = new Hero({nick:"sova"})
       sova.save(function(err,result){
       callback(err,result)
 })
 },
 function(callback){
       var iaia = new Hero({nick:"iaia"})
       iaia.save(function(err,result){
       callback(err,result)
 })
 }
 ],
 function(err,result){
 if(err) throw err
 console.log(result.join(","))
 mongoose.connection.close()
 })

   mongoose.connection.close()
   })
  })
