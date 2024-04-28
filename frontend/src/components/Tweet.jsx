import React from 'react'
import Avatar from 'react-avatar'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';
import axios from "axios"
import {TWEET_API_ENDPOINT} from "../utils/constant"
import {useSelector,useDispatch} from "react-redux"
import toast from 'react-hot-toast'
import {getRefresh } from '../redux/tweetSlice';
import { timeSince } from '../utils/constant';

function Tweet({tweet}) {

  const {user}=useSelector(store => store.user)

  const dispatch=useDispatch()

  const likeOrDislikeHandler=async(id)=>{
       try{
          const res=await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`,{id:user?._id},{
            withCredentials:true,
          })
          dispatch(getRefresh())
            toast.success(res.data.message)
       }
       catch(error){
        console.log("Error in Tweet.jsx",error)
       }
  }

  const deleteHandler =async(id)=>{
      try{
          const res=await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`,{
            withCredentials:true,
          })
          dispatch(getRefresh())
          toast.success(res.data.message)
      }
      catch(error){
        console.log("Error in Tweet.jsx ",error)
      }
  }

  return (

    <div className='border-b border-gray-300'>
       <div>
          <div className='flex p-3'>
          <Avatar src="https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg" size="50" round={true} />
          <div className='ml-2 w-full'>
            <div className='flex items-center'>
            <h1 className='font-bold'>{tweet?.userDetails[0].name}</h1>
            <p className='text-gray-500 text-sm ml-1'> {`@${tweet?.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`} </p>
            </div>
            <div>
            <p>{tweet?.description}</p>
            </div>
            <div className='flex justify-between my-2'>
               <div className='flex items-center'>
                  <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                     <CommentIcon />
                  </div>
                  <p >0</p>
               </div>
               <div className='flex items-center'>
                 <div className='p-2 hover:bg-red-200 rounded-full cursor-pointer' onClick={()=>likeOrDislikeHandler(tweet?._id)}>
                   <FavoriteIcon/>
                 </div>
                 <p >{tweet?.like?.length}</p>
               </div>
               <div className='flex items-center'>
                 <div className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                 <BookmarkIcon/>
                 </div>
                 <p >0</p>
               </div>
               
               {
                  user?._id===tweet?.userId && (
                    <div onClick={()=>deleteHandler(tweet?._id)} className='flex items-center'>
                  <div className='p-2 hover:bg-red-500 rounded-full cursor-pointer'>
                  <DeleteIcon/>
                  </div>
                 </div>
                )
               }

               

            </div>
          </div>
          </div>
       </div>
    </div>
  )
}

export default Tweet
