import Tweet from "../models/tweet.model.js";
import User from "../models/user.model.js";

export const createTweet=async(req,res)=>{
   try{
      const {description,id}=req.body;
      if(!description || !id){
        return res.status(401).json({message:"All fields are required",success:false})

      }
      const user=await User.findById(id).select("-password")
      await Tweet.create({description,userId:id,userDetails:user})

      return res.status(200).json({message:"Tweet created",success:true})
   }
   catch(error){
      console.log(error);
      res.status(500).json({message:"Error in creating tweet",success:false});
   }
}

export const deleteTweet =async (req, res) => {
  try{
      const {id}=req.params;

      await Tweet.findByIdAndDelete(id);

      return res.status(200).json({message:"Tweet deleted",success:true})

  }
  catch(error){
   console.log(error);
   res.status(500).json({message:"Error in deleting tweet",success:false});
  }

}

export const likeOrDislike=async(req,res)=>{
   try{
     const loggedInUserId=req.body.id;
     const tweetId=req.params.id 
     const tweet=await Tweet.findById(tweetId);
     
     if(tweet.like.includes(loggedInUserId)){
         await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}})
         return res.status(200).json({ message: "User disliked your tweet." });
     }
     else{
      await Tweet.findByIdAndUpdate(tweetId,{$push:{like:loggedInUserId}})
      return res.status(200).json({ message: "User liked your tweet." });
     }

}
catch(error){
      console.log(error);
      res.status(500).json({message:"Error in like tweet",success:false});
   }
}   

export const getAllTweets=async(req, res) => {
   try{
     const id=req.params.id

     const loggedInUser=await User.findById(id);

     const loggedInUserTweets=await Tweet.find({userId:id});

     const followingUserTweet=await Promise.all(loggedInUser.following.map((otherUsersId)=>{
      return Tweet.find({userId:otherUsersId})
     }))

     return res.status(200).json({
      tweets:loggedInUserTweets.concat(...followingUserTweet),
     })

   }
   catch(error){
      console.log(error);
      res.status(500).json({message:"Error in getAllTweet",success:false});
   }

}

export const getFollowingTweets=async(req,res)=>{
   try{
      
      const id=req.params.id
      console.log(id)
      const loggedInUser=await User.findById(id);
 
      const followingUserTweet=await Promise.all(loggedInUser.following.map((otherUsersId)=>{
       return Tweet.find({userId:otherUsersId})
      }))
 
      return res.status(200).json({
       tweets:[].concat(...followingUserTweet)
      })

   }
   catch(error){
      console.log(error);
      res.status(500).json({message:"Error in getFollowingTweet",success:false});
   }
}
