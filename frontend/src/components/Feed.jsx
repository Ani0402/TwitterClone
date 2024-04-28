import React from 'react'
import CreateFeed from './CreateFeed'
import Tweet from './Tweet'
import {useSelector} from "react-redux"

const Feed = () => {

 const {tweets}=useSelector(store => store.tweet)


  return (
    <div className="w-[60%] border border-gray-200">
      <div>
      <CreateFeed/>
        {

           tweets?.map((tweet)=>{
              return <Tweet key={tweet?._id} tweet={tweet}/>
           })

        }
      
      </div>
    </div>
    
  )
}

export default Feed
