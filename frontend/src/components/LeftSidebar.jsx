import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link,useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
import axios from "axios"
import {USER_API_ENDPOINT} from "../utils/constant"
import {useDispatch} from 'react-redux'
import { getUser,getOtherUsers, getMyProfile } from '../redux/userSlice';

function LeftSidebar() {
 
  const {user}=useSelector(store => store.user)
  const navigate=useNavigate()
  const dispatch = useDispatch()

  const logoutHandler=async()=>{
      try{
        const res=await axios.get(`${USER_API_ENDPOINT}/logout`)
        
        dispatch(getUser(null))
        dispatch(getOtherUsers(null))
        dispatch(getMyProfile(null))

        navigate('/login')
      }
      catch(error){
        console.log("Error in logoutHandler ",error)
      }
  }

  return (
    <div>
      <div>
         <div>
           <img width={"24px"} src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo" className='ml-4'></img>
         </div>
         <div className='my-4'>
            <Link to="/" className='flex items-center my-3 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
               <div>
                 <HomeIcon/>
               </div>
               <h1 className='font-bold text-lg ml-2'>Home</h1>
            </Link>

              <div className='flex items-center my-3 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
              <div>
                <SearchIcon/>
              </div>
              <h1 className='font-bold text-lg ml-2'>Explore</h1>
            </div>

            <div className='flex items-center my-3 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
            <div>
              <NotificationsIcon/>
            </div>
            <h1 className='font-bold text-lg ml-2'>Notification</h1>
            </div>

            <Link to= {`/profile/${user?._id}`} className='flex items-center my-3 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
              <div>
                <PersonIcon/>
              </div>
              <h1 className='font-bold text-lg ml-2'>Profile</h1>
            </Link>

            <div className='flex items-center my-3 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
            <div>
              <BookmarkIcon/>
            </div>
            <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
            </div>

            <div onClick={logoutHandler} className='flex items-center my-3 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
            <div>
              <LogoutIcon/>
            </div>
            <h1 className='font-bold text-lg ml-2'>Logout</h1>
            </div>

            <button className='px-4 py-2 border-none text-white rounded-full bg-blue-500 w-full font-bold'>Post</button>

         </div>
      </div>
    </div>
  )
}

export default LeftSidebar
