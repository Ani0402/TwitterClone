import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js'
import tweetRouter from './routes/tweetRoutes.js'
import cookieParser from 'cookie-parser';
import cors from "cors"

connectDB()

const app = express();

app.use(cookieParser())
app.use(express.json())

const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}

app.use(cors(corsOptions))

const PORT=(process.env.PORT) || 4000;

app.use('/api/v1/user',userRouter)

app.use('/api/v1/tweet',tweetRouter)

app.listen(PORT,()=>{
    console.log('listening on port '+PORT)
}) 
