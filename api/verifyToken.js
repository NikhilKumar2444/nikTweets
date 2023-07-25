import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        res.status(401).json("Not allowed");
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            res.status(403).json("Token error");
        }
        req.user=user;
        next();
    });
};