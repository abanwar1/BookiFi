import React, { useState,useEffect } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const ViewBookDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const role = useSelector((state)=> state.auth.role)
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  useEffect(() => {
    const fetch = async () =>{
      const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
      setData(response?.data?.data)
    }
    fetch();
  }, [])
  const handleFavourite = async () =>{
    const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite",{},{headers});
    alert(response?.data?.message);
    
  }
  const handleCart = async () =>{
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{headers});
    alert(response?.data?.message);
    
  }
  const deleteBook = async () =>{
    const response = await axios.delete("http://localhost:1000/api/v1/delete-book",{headers});
    alert(response?.data?.message);
    navigate("/all-books");
    
  }
  
  return (
    <>
    {data && (
      <div className='px-4 md:py-12 pay-8 bg-zinc-900 flex gap-8 flex-col md:flex-row items-start'>
      <div className='w-full lg:w-3/6 '>
      <div className=' flex justify-around bg-zinc-800 rounded p-12'>
      <img src={data?.url} alt="/" className='h-[50vh] lg:h-[70vh] runded object-cover'/>
      {isLoggedIn === true && role ==="user" && 
      <div className='flex md:flex-col'>
      <button className='bg-white rounded-full text-2xl p-3 text-red-500' onClick={handleFavourite}><FaHeart /></button>
      <button className='bg-white rounded-full text-2xl p-3 text blue-500 mt-8' onClick={handleCart}><FaShoppingCart /></button>
      </div>}
      {isLoggedIn === true && role ==="admin" && 
      <div className='flex md:flex-col'>
      <Link to={`/updateBook/${id}`} className='bg-white rounded-full text-2xl p-3'><FaEdit /></Link>
      <button className='bg-white rounded-full text-2xl p-3 text-blue-500 mt-8' onClick={deleteBook}><MdDelete /></button>
      </div>}
      </div>
      </div>
      <div className='p-4 w-full lg:w-3/6'>
      <h1 className='text-4xl text-zinc-300 font-semibold'>{data?.title}</h1>
      <p className='text-zinc-400 mt-1'>{data?.author}</p>
      <p className='text-zinc-500 mt-4 text-sm'>{data?.desc}</p>
      <p className='flex text-zinc-400 mt-4 justify-start items-center'><GrLanguage className='me-3'/>{data?.language}</p>
      <p className=' text-zinc-100 mt-4 text-xl font-semibold'>Price: ₹{data?.price}</p>
      </div>
    </div>
    )}
    </>
  )
}

export default ViewBookDetails