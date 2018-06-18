var User = require("./../models/User").User
module.exports = function(req,res,next){
 if(req.session.user){
 User.findById(req.session.user,function(err,user){
 if(err) return next(err)
 res.locals.user = user
 next()
 })
} else {
 res.locals.user = null
 next()
}
}
