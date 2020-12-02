var count = 0;
module.exports.cookieCount = function(req, res, next) {    
  //res.cookie("userId", "VNG-001", {count: count});  
  //res.locals.success = true;
  if (req.cookies.userId === 'VNG-001'){
    count = ++count;
    console.log(req.cookies.userId, count);
  }
  next();
}