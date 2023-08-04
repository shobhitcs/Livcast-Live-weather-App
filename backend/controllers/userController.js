const User=require('../models/usermodel')
const jwt=require('jsonwebtoken')

const createtoken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
const loginUser=async(req, res) => {
    const {email,password}=req.body

    try{
        const user=await User.login(email,password);
        // console.log(user._id)
        //create a token
        const token =createtoken(user._id);
        // console.log(token)
        res.status(200).json({email,token});
    }
    catch(error){   
        res.status(400).json({error: error.message});
    }
    // res.json({mssg:"login user"});
}

const signupUser=async (req, res) => {

    const {email,password} = req.body;
    // console.log(email,password, req.body);
    try{
        const user=await User.signup(email,password);
        // console.log(user._id)
        //create a token
        const token =createtoken(user._id);
        // console.log(token)
        res.status(200).json({email,token});
    }
    catch(error){   
        res.status(400).json({error: error.message});
    }
    // res.json({mssg:"signup user"});
}

const verifyUser=async (req, res) => {
    const {email,token}=req.body;
    try{
        const {_id}=jwt.verify(token,process.env.SECRET);
        const user=await User.findById(_id).select('email');
        // console.log(user.email,email,req.body);
        if(user.email==email){
            return res.status(200).json({message:'User Verified !'});
        }else{
            throw Error('User Unauthenticated, Access denied');
        }
    }catch(error){
        // console.log(error);
        res.status(401).json({message:error.message})
    }
}

module.exports ={loginUser,signupUser,verifyUser};