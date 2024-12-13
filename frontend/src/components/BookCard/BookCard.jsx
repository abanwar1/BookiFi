import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BookCard = ({items, fav}) => {
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:items?._id
  }
  const handleRemoveBook = async ()=>{
    const response = await axios.put("http://localhost:1000/api/v1/remove-book-from-favourite",{},{headers});
      alert(response?.data?.message);
  }
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <Link to={`/view-book-details/${items._id}`}>
    <div className=''>
      <div className='bg-zinc-900 rounded flex items-center justify-center'>
        <img src={items.url} alt="/" className='h-[25vh]'/>
      </div>
      <h2 className='mt-4 text-xs font-semibold text-yellow-100'>{items.title}</h2>
      <h2 className='mt-2 text-zinc-400 font-semibold text-xs'>by {items.author}</h2>
      <h2 className='mt-2 text-zinc-200 font-semibold text-xs'>₹ {items.price}</h2>
      
    </div>
    </Link>
    {fav && (
      <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4' onClick={handleRemoveBook}>Remove form favourite</button>
    )}
    </div>
  )
}

export default BookCard