import React, { useState,useEffect } from 'react'
import axios from "axios"
import BookCard from '../components/BookCard/BookCard';
const RecentlyAdded = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () =>{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/get-all-books`);
      setData(response?.data?.data)
      
    }
    fetch();
  }, [])
  
  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100' >All Books</h4>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data && data.map((items,index)=>(
          <div key={index}><BookCard items={items}/></div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyAdded