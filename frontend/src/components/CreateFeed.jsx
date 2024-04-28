import React, { useState } from 'react'
import Avatar from 'react-avatar'
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios'
import {TWEET_API_ENDPOINT} from "../utils/constant"
import toast from 'react-hot-toast'
import {useSelector,useDispatch} from "react-redux"
import { getAllTweets,getIsActive,getRefresh } from '../redux/tweetSlice';


function CreateFeed() {

  const [description,setDescription]=useState("")
  const {user}=useSelector(store => store.user)
  const dispatch=useDispatch()
  const{isActive}=useSelector(store=> store.tweet)
  

  const submitHandler=async()=>{
     try{
         const res=await axios.post(`${TWEET_API_ENDPOINT}/create`,{description,id:user?._id},{
          withCredentials:true
         })
         dispatch(getRefresh())
         if(res.data.success){
           toast.success(res.data.message)
           
         }
     }
     catch(error){
      console.log("Error in createFeed ",error)
     }
    setDescription("")
  }

  const forYouHandler=()=>{
    dispatch(getIsActive(true))
  }

  const followingHandler=()=>{
    dispatch(getIsActive(false))
  }

  return (
    <div>
      <div className='w-[100%]'>
        
        <div>
          <div className="flex items-center justify-evenly border-b border-gray-300">
            <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600":null} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 `}>
            <h1 className='font-bold text-gray-600 text-lg'>For You</h1>
            </div>
            <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600":null} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className='font-bold text-gray-600 text-lg '>Following</h1>
            </div>
          </div>
        </div>

        <div>

           <div className='m-3'>
              <div className='flex items-center py-4'>
                <Avatar src="https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg" size="50" round={true} />
                <input value={description} type="text" placeholder="What is happening?!" className="w-full outline-none border-none text-lg ml-3" onChange={(e)=>setDescription(e.target.value)}/>
              </div>
              <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                <div>
                  <ImageIcon/>
                </div>
                <button className="bg-blue-500 px-4 py-1 border-none text-white rounded-full" onClick={submitHandler}>Post</button>
              </div>
           </div>

        </div>
      </div>
    </div>
  )
}

export default CreateFeed
