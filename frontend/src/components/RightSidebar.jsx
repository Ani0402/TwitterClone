import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom';

function RightSidebar({otherUsers}) {
  return (
    <div className='w-[20%] '>
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
        <SearchIcon />
        <input type="text" className="bg-transparent outline-none px-2" placeholder="Search" />
      </div>
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
         <h1 className="font-bold text-lg ">Who to follow</h1>
         {
            otherUsers?.map((user)=>(
            <div key={user?._id} className='flex items-center justify-between my-3'>
              <div className='flex'>
                <div>
                  <Avatar src="https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg" size="50" round={true} />
                </div>

                <div className="ml-2"> 
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm text-gray-500">{`@${user?.username}`}</p>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                   <button className='px-4 py-1 bg-black rounded-full text-white'>Profile</button>
                  </Link>
                </div>
              </div>
            </div>
            ))

         }
         
      </div>
    </div>
  )
}

export default RightSidebar
