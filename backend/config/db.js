import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config({
    path:".env"
})

const connectDB=async()=>{
    try{
        
      await mongoose.connect(process.env.DB_URL)   
      console.log("Connected to MongoDB")
    }
    catch(error){
        console.log(error);
    }
} 

export default connectDB;