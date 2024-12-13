import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(()=>{
    const fetch = async() =>{
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information",{headers});
      // console.log(response?.data);
      setProfile(response?.data);
      
    }
    fetch();
  },[])
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 -8 gap-4 text-white'>
     {profile && (
      <>
      <div className='w-full md:w-1/6'> <Sidebar data={profile}/></div>
      <div className='w-full md:w-5/6'><Outlet/></div>
      </>
     )}
    </div>
  )
}

export default Profile