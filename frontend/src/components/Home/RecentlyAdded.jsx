import React, { useState,useEffect } from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard';
const RecentlyAdded = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () =>{
      const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
      setData(response?.data?.data)
      
    }
    fetch();
  }, [])
  
  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100' >Recently added Books</h4>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap4'>
        {data && data.map((items,index)=>(
          <div key={index}><BookCard items={items}/></div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyAdded