const jwt= require('jsonwebtoken');
const User = require('../models/User');

const requireAuth= (req,res,next)=>{

    const token=req.cookies.jwt;
    //check if jwt exists
    if(token){
        jwt.verify(token, 'secret function',(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

//check current user
const checkUser= (req,res, next)=>{
    const token= req.cookies.jwt;

    if(token){
        jwt.verify(token, 'secret function',async(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                next();
                res.locals.user= null
            }else{
                console.log(decodedToken);
                let user= await User.findById(decodedToken.id);
                res.locals.user= user;
                next();
            }
        })
    }
    else{
        res.locals.user= null
        next()
    }
}
module.exports= {requireAuth, checkUser}