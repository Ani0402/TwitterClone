import axios  from "axios";

import {TWEET_API_ENDPOINT} from "../utils/constant"
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getAllTweets} from "../redux/tweetSlice"

const useGetMyTweets=(id)=>{
    const dispatch=useDispatch()
    const {refresh,isActive}=useSelector(store => store.tweet)

    const fetchMyTweet=async()=>{
        try{
            const res=await axios.get(`${TWEET_API_ENDPOINT}/allTweets/${id}`,{
                withCredentials:true
            })
            
            dispatch(getAllTweets(res.data.tweets))

            }
            catch(error){
                console.log("Error in useGetProfile ",error);
            } 
    }

    const followingHandler=async()=>{
        try{
            const res=await axios.get(`${TWEET_API_ENDPOINT}/followingTweets/${id}`,{
              withCredentials:true
            }) 
            dispatch(getAllTweets(res.data.tweets))
            
        }
        catch(error){
           console.log(error)
        }
      }

    useEffect(()=>{
        if(isActive){
            fetchMyTweet()
        }
        else{
            followingHandler()
        }
   
    
    },[isActive,refresh])
   
}

export default useGetMyTweets;