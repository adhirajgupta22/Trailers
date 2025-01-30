//user authenticator middleware for continuous logged in 
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({success:"false",message:"Unoauthorized - No token available"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:"false",message:"Unoauthorized - Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({success:"false",message:"user not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error"});
        console.log("Error in protectRoute middleware",error.message);
    }
}