import bcryptjs from 'bcryptjs';
import  User  from "../models/user.model.js";
import jwt from "jsonwebtoken" 
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config({
    path:".env"
})

export const Register = async(req, res) =>{
  try{
    const {name,username,email,password}=req.body;

    if(!name || !username || !password || !email){
       return res.status(401).json({message:"All fields are required",success:false});
    }

    const user=await User.findOne({email})
    
    if(user){
      return  res.status(401).json({message:"User already exists",success:false});
    }

    const hashedPassword=await bcryptjs.hash(password,10)

    const newUser=await User.create({name:name,username:username,email:email,password:hashedPassword})

    await newUser.save();
    
    res.status(200).json({message:"User registered successfully",success:true});

  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Error in registering",success:false});
  }
}

export const Login = async(req, res) =>{
   try{
     const {email,password} = req.body;

     if(!email || !password){
        return  res.status(401).json({message:"User already exists",success:false});
     }

     const user=await User.findOne({email:email});

     if(!user){
        return  res.status(401).json({message:"User does not exists",success:false});
     }

     if(!await bcryptjs.compare(password,user.password)){
        return  res.status(401).json({message:"Password does not match",success:false});
     }

     const payload={
        id:user._id,
     }
     const token=jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"1d"})


     return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true
    })
     
  }
   catch(error){
    console.log(error);
    res.status(500).json({message:"Error in login",success:false});
   }
}

export const Logout=(req,res)=>{
  return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({message:"user logged out",success:true});
}

export const bookmarks=async(req,res)=>{
  try{
    const loggedInUserId=req.body.id;
    const tweetId=req.params.id 
    const user=await User.findById(loggedInUserId);
    
    if(user.bookmarks.includes(tweetId)){
        await User.findByIdAndUpdate(loggedInUserId,{$pull:{bookmarks:tweetId}})
        return res.status(200).json({ message: "User unbookmarked your tweet." });
    }
    else{
     await User.findByIdAndUpdate(loggedInUserId,{$push:{bookmarks:tweetId}})
     return res.status(200).json({ message: "User bookmarked your tweet." });
    }

}
catch(error){
     console.log(error);
     res.status(500).json({message:"Error in bookmark tweet",success:false});
  }
}   

export const getProfile = async(req, res) =>{
   try{
    const id=req.params.id;

    const user=await User.findById(id).select("-password");

    return res.status(200).json({user,success:true});
   }
   catch(error){
    console.log(error)

    res.status(500).json({message:"Error in getting profile",success:false});
   }
}

export const getOtherUsers=async(req,res)=>{
   try{
     const {id}=req.params;
     console.log(id)

     const otherUser=await User.find({_id:{$ne:id}}).select("-password");

     if(!otherUser){
      return res.status(401).json({
          message:"Currently do not have any users."
      })
   };
   
     return res.status(201).json({otherUser})
      
   }
   catch(error){
    console.log(error)

    res.status(500).json({message:"Error in getting other users",success:false});
   }
}

export const follow=async(req,res)=>{
   try{
      const loggedInUserId=req.body.id;
      const userId=req.params.id

      const loggedInUser = await User.findById(loggedInUserId)
      const user=await User.findById(userId)
       
      if(!user.followers.includes(loggedInUserId)){
        await user.updateOne({$push:{followers:loggedInUserId}})
        await loggedInUser.updateOne({$push:{following:userId}})

        return res.status(200).json({message:"user followed"})
      }
      else{
        await user.updateOne({$pull:{followers:loggedInUserId}})
        await loggedInUser.updateOne({$pull:{following:userId}})

        return res.status(200).json({message:"user unfollowed"})
      }
   }
   catch(error){
    console.log(error)
    res.status(500).json({message:"Error in follow",success:false});
   }
}

export const unfollow = async(req, res) => {
   try{
    const loggedInUserId=req.body.id;
    const userId=req.params.id

    const loggedInUser = await User.findById(loggedInUserId)
    const user=await User.findById(userId)

    if(user.followers.includes(loggedInUserId)){
      await user.updateOne({$pull:{followers:loggedInUserId}})
      await loggedInUser.updateOne({$pull:{following:userId}})

      return res.status(201).json({message:"user unfollowed"})
    }
    else{
      return res.status(201).json({message:"user has not followed person with userId ",userId})
    }
   }
   catch(error){
    console.log(error)
    res.status(500).json({message:"Error in unfollow",success:false});
   }
}