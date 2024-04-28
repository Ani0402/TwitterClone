import React, { useState } from 'react'
import axios from 'axios'
import {USER_API_ENDPOINT} from "../utils/constant"
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getUser } from '../redux/userSlice';

const Login = () => {
  const[login,setLogin]=useState(true)
 
  const[name,setName]=useState("");
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("");

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const loginSignUpHandler=()=>{
    setLogin((prev)=>!prev)
  }
   
  const submitHandler=async(e)=>{
     e.preventDefault()
     if(login){
      try{
        const res=await axios.post(`${USER_API_ENDPOINT}/login`,{email,password},{
          headers:{
            'Content-Type': 'application/json', 
          },
          withCredentials:true
        });
        
          dispatch(getUser(res?.data?.user))

          if(res.data.success){
            navigate("/")
            toast.success(res.data.message);
          }
        }
        catch(error){
          console.log(error);
        }
     }
     else{
       try{
           const res=await axios.post(`${USER_API_ENDPOINT}/register`,{name,username,password,email},{
            headers:{
              'Content-Type': 'application/json', 
            },
            withCredentials:true
          });
          navigate("/login")
            if(res.data.success){
              setLogin(true)
              toast.success(res.data.message);
            }
       }
       catch(error){
         console.log(error);
       }
     }
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
         <div>
           <img src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo" width={"340px"}/>
         </div>


         <div >
            <div className='my-5'>
              <h1 className='font-bold text-6xl'>Happening Now.</h1>
            </div>
            <h1 className='font-bold mt-4 mb-2 text-2xl'>
             {login ? "Login":"Join Today"}
            </h1>

           <form className='flex flex-col w-[55%]' onSubmit={submitHandler}>
                {
                   !login && 
                   <>
                    <input type='text' value={name} placeholder="Name" className='px-3 py-1 outline-blue-500 border  border-gray-800 rounded-full m-2 font-semibold' onChange={(e)=>setName(e.target.value)}></input>

                    <input type='text' value={username} placeholder="UserName" className='px-3 py-1 outline-blue-500 border  border-gray-800 rounded-full m-2 font-semibold' onChange={(e)=>setUsername(e.target.value)}></input>

                   </>
                }

                <input type='email' placeholder="Email" value={email} className='px-3 py-1 outline-blue-500 border  border-gray-800 rounded-full m-2 font-semibold' onChange={(e)=>setEmail(e.target.value)}></input>

                <input type='password' placeholder="Password" value={password} className='px-3 py-1 outline-blue-500 border  border-gray-800 rounded-full m-2 font-semibold' onChange={(e)=>setPassword(e.target.value)}></input>

                <button className="bg-blue-500 py-2 rounded-full text-white cursor-pointer my-4">{login ? "Login":"Create Account"}</button>

                <h1>{login ? "Do not have an account!" : "Already have an account?"} <span className="cursor-pointer text-blue-900" onClick={loginSignUpHandler}>{login ? "SignUp":"Login"}</span></h1>
           </form>
           
         </div>
      </div>
    </div>
  )
}

export default Login
