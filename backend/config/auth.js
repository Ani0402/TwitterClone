import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
    path:".env"
})

const isAuthenticated=async(req,res,next)=>{
 try{
   const token=req.cookies.token;

   if(!token){
    return res.status(401).json({message:"User not authenticated",success:false});
   }

   const decoded=jwt.verify(token,process.env.TOKEN_SECRET)

   req.user=decoded.id;

   next();
 }
 catch(error){
   console.log(error)
   return res.status(401).json({message:"Error in authentication",success:false});
 }
}

export {isAuthenticated};