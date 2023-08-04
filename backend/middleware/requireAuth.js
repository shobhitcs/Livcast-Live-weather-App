const jwt=require('jsonwebtoken');
const User=require('../models/usermodel')

const requireAuth = async (req,res,next) => {

    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({message: 'Token required.'});
    }
    const email = authorization.split(' ')[1];
    const token = authorization.split(' ')[2];
    // console.log(email,token);
    try{
        const {_id}=jwt.verify(token,process.env.SECRET);
        const user=await User.findById(_id);
        if(!user){
            throw Error('Not a user, Access denied');
        }
        // console.log(user.email,email);
        if(user.email==email){
            // res.status(200).json({message:'User Verified !'});
            next();
        }else{
            throw Error('User Unauthenticated, Access denied');
        }
    }catch(error){
        // console.log(error);
        res.status(401).json({message:error.message})
    }
    // next();
    // console.log(authorization,123);
}
module.exports = {requireAuth};