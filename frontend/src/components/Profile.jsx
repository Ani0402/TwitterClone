import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link,useParams} from "react-router-dom"
import Avatar from 'react-avatar'
import toast from 'react-hot-toast'
import useGetProfile from '../hooks/useGetProfile'
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"
import {USER_API_ENDPOINT} from "../utils/constant"
import { followingUpdate } from '../redux/userSlice';


const Profile = () => {

  const {user,profile}=useSelector(store => store.user)

  const {id}=useParams()
  useGetProfile(id)

  const dispatch=useDispatch()

  const followOrUnfollowHandler=async()=>{
      if(user.following.includes(id)){
        try{
           const res=await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`,{id:user._id},{
            withCredentials:true
           }) 
           dispatch(followingUpdate(id))
           dispatch(getRefresh());
           toast.success(res.data.message)
        }
        catch(error){
          console.log("Error in followOrUnfollowHandler ",error)
        }
      }
      else{
        try{
          const res=await axios.post(`${USER_API_ENDPOINT}/follow/${id}`,{id:user._id},{
           withCredentials:true
          }) 
          dispatch(followingUpdate(id));
          dispatch(getRefresh());
          toast.success(res.data.message)
       }
       catch(error){
         console.log("Error in followOrUnfollowHandler ",error)
       }
      }
  }
  
  return (
    <div className="w-[60%] border border-l border-r border-gray-200">
      <div>
         <div className='flex items-center py-2'>

           <Link to="/" className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
             <ArrowBackIcon/>
           </Link>

           <div className="ml-2">
            <h1 className='font-bold text-lg'>{profile?.name}</h1>
            <p className='text-gray-500 text-sm'>11,000 posts</p>
           </div>
         </div>

         <img src="https://pbs.twimg.com/profile_banners/50393960/1672784571/1500x500" alt="banner"/>

         <div className='absolute top-[34%] border-4 border-white rounded-full ml-2'>
          <Avatar src="https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg" size="120" round={true} />
         </div>
         <div className="text-right m-3">
            {
               profile?._id===user?._id ? <button className="px-4 py-1 rounded-full border border-gray-400  hover:bg-gray-200 cursor-pointer">Edit Profile</button>
               :
               <button onClick={followOrUnfollowHandler} className="px-4 py-1 rounded-full border text-white bg-black   cursor-pointer">{user?.following.includes(id) ? "Following" : "Follow"}</button>

            }
           
         </div>
         <div className="m-4">
            <h1 className="font-bold text-xl">{profile?.name}</h1>
            <p>{`@ ${profile?.username}`}</p>
         </div>
         <div className="m-4 text-md">
           <p>Sharing things I'm learning through my foundation work and other interests.</p>
         </div>
      </div>
    </div>
  )
}

export default Profile
