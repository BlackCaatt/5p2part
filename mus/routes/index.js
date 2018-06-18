var express = require('express');
var router = express.Router();
var Hero = require("../models/hero").Hero
var User = require("./../models/User").User



router.get('/hero/:nick' ,function(req,res,next){
Hero.findOne({"nick":req.params.nick},
function(err,result){
 if (err) throw err
 var hero = result
 res.render('hero', {
 title: hero.title,
 picture: hero.avatar,
 about: hero.desc
 })
})
});


/* GET home page. */
router.get("/",function(req,res,next){
  req.session.greeting = "Hi!!!"
  res.render('homepage',{
    counter:req.session.counter,
     title:"Музыкальные группы:",
     pictureh1: "images/ig.jpg",
     pictureh2: "images/muse.jpg",
     pictureh3: "images/am.jpg",
     pictureh4: "images/placebo.jpg",
     pictureh5: "images/21p.jpg",
     about: "Imagine Dragons (дословно «Вообрази драконов») — американская инди-рок группа, образованная в Лас-Вегасе в 2008 году. Стали известны после выпуска дебютного студийного альбома Night Visions в сентябре 2012 года. Американский журнал Billboard назвал их самыми яркими новыми звёздами 2013 года[8], а журнал Rolling Stone назвал их сингл «Radioactive» самым большим рок-хитом года[9]."
     })
});


/* GET auth page. */
router.get('/logreg', function(req, res, next) {
 res.render('logreg');
});

/* POST auth page. */
router.post('/logreg', function(req, res, next) {
 var username = req.body.username
 var password = req.body.password
 User.findOne({username:username},function(err,user){
 if(err) return next(err)
if(user){
  //res.send('Пользователя нашли')
 if(user.checkPassword(password)){
 //res.send('Пароль правильный')
 req.session.user = user
 res.redirect('/')
 } else {
 //res.send('Пароль НЕ правильный')
 res.redirect('/')
}
 } else {
   //res.send('Пользователя не нашли');
  var user = new User({username:username,password:password})
  user.save(function(err,user){
   if(err) return next(err)
   res.session.user = user._id
   res.redirect('/')
  })
 }
 })
});


//
// /* Страница Imagine Dragons */
// router.get("/ig",function(req,res,next){
//   res.render('hero',{
//      title:"Imagine Dragons",
//      picture: "images/ig.jpg",
//      picture1: "images/igrl.jpg",
//      about: "Музыка группы Imagine Dragons несет в себе какой-то сверхъестественный заряд позитива, который магнетически притягивает меломанов с абсолютно разными вкусами.сновные стили, в которых играют участники Imagine Dragons – альтернативный и инди-рок. Но музыканты не ограничиваются только этими жанрами. В их творчестве немало поп-рока и электроники, а местами «проскакивают» даже фолк-рок и хип-хоп.В отличии от молодых рок-групп, которые годами не могут перебраться из гаражей на сцену, этот необычный коллектив практически сразу же заявил о себе, как о новой звезде в мире современной рок-музыки."
//      })
// })
// /* Страница Muse */
// router.get("/muse",function(req,res,next){
//   res.render('hero',{
//      title:"Muse",
//      picture: "images/muse.jpg",
//      picture1: "images/muserl.jpg",
//      about: "Muse (читается «мьюз», англ. - муза) – британская альтернативная рок-группа, образованная в 1994 году в городе Тинмут (графство Девон), Великобритания.Сегодня Muse называют одним из величайших наследий рок-музыки нового тысячелетия. Музыка, словно пришедшая к нам из другой Галактики, страстное исполнение, сильнейший театральный вокал, виртуозные гитарные партии, ураганной мощи живые выступления - все это Muse! Группа состоит из трёх участников: Мэттью Беллами (англ. Matthew Bellamy, вокалист, гитарист и клавишник), Криса Уолстенхолма (англ. Chris Wolstenholme, бас-гитарист, бэк-вокал) и Доминика Ховарда (англ. Dominic Howard, барабанщик и перкуссионист)."
//      })
// })
// /* Страница 21 pilots */
// router.get("/21p",function(req,res,next){
//   res.render('hero',{
//      title:"Twenty one pilots",
//      picture: "images/21p.jpg",
//      picture1: "images/21prl.jpg",
//      about: "Американский музыкальный дуэт из Колумбуса, штат Огайо. Группа образовалась в 2009 году и состоит из Тайлера Джозефа и Джоша Дана. Они самостоятельно выпустили два альбома: Twenty One Pilots в 2009 и Regional at Best в 2011. В 2012 году подписали контракт с Columbus' Newport Music Hall, и в 2013 выпустили студийный альбом Vessel.В 2014 группа начала прорываться в мейнстрим. Таким образом они отправились по самым популярным фестивалям, таким как Lollapalooza, Bonnaroo и Firefly. Так же они посмотрели запросы из разных городов и объединили все это в Quiet Is Violent World Tour, который стартовал в сентябре 2014 года."
//      })
// })
// /* Страница placebo */
// router.get("/placebo",function(req,res,next){
//   res.render('hero',{
//      title:"Placebo",
//      picture: "images/placebo.jpg",
//      picture1: "images/placeborl.jpg",
//      about: "«Placebo» (/pləˈsiːbəʊ/[1]; в переводе с англ. — «плацебо») — британская рок-группа, исполняющая альтернативный рок и инди-рок. Сформирована в 1994 году двумя музыкантами Брайаном Молко и Стефаном Ольсдалем. В сентябре 2013 года вышел 7-й студийный альбом группы — Loud Like Love.Placebo была сформирована в 1994 году двумя музыкантами Брайаном Молко и Стефаном Ольсдалем, которые для работы над первыми демозаписями пригласили барабанщика Стива Хьюитта, но так как он не мог уделять много времени группе, вскоре перед записью дебютного альбома его заменил Роберт Шульцберг. Первоначально группа называлась Ashtray Heart."
//      })
// })
// /* Страница Artic Monkeys */
// router.get("/am",function(req,res,next){
//   res.render('hero',{
//      title:"Artic Monkeys",
//      picture: "images/am.jpg",
//      picture1: "images/amrl.jpg",
//      about: "Arctic Monkeys (примерный перевод — «Арктические мартышки») — британская рок-группа, сформированная в 2002 году в Хай Грин, пригороде Шеффилда. В настоящий момент состоит из вокалиста и гитариста Алекса Тёрнера, гитариста Джейми Кука, барабанщика Мэтта Хелдерса и бас-гитариста Ника О’Мэлли.Первая пластинка группы стала самым быстро продаваемым дебютным альбомом в истории Великобритании. Ансамбль завоевал семь наград Brit Awards: дважды став лучшей группой и трижды — за лучший альбом года. Два раза квартет номинировался на премию «Грэмми».Такой успех, учитывая скептическое отношение членов группы к музыкальной индустрии и их нежелание заключать контракт с мейджор-лейблом, во многом объясняется активным распространением их демозаписей фанатами через Интернет, в частности, через P2P и социальные сети. Arctic Monkeys стали одной из первых групп, добившихся крупного успеха без поддержки традиционных СМИ, таких как радио и телевидение."
//      })
// })
// router.get("/sn1",function(req,res,next){
//   res.render('snip1',{
//
//   })
// })

module.exports = router;
