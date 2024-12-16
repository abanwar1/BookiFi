import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
const AllOrder = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [values,setValues] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  const change = (e) => {
    const { value } = e.target; 
    setValues({ status:value});
  };
  useEffect(()=>{
    const fetch = async () =>{
      const response = await axios.get("http://localhost:1000/api/v1/get-all-orders",{headers});
      setAllOrders(response?.data?.data);
      
    };
    fetch();
  },[allOrders]);
  const submitChangers = async () =>{
    const id = allOrders[index]._id;
    const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`,values,{headers});
    alert(response?.data?.message);
  }
  return (
    <div>
      {allOrders && allOrders.length>0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xlfont-semibold text-zinc-500 mb-8'>All Orders</h1>
        <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex fap-2'>
          <div className='w-[3%]'>
            <h1 className='text-center'>Sr.</h1>
          </div>
          <div className='w-[22%] ml-3'>
            <h1>Books</h1>
          </div>
          <div className='w-[45%]'>
            <h1>Description</h1>
          </div>
          <div className='w-[9%]'>
            <h1>Price</h1>
          </div>
          <div className='w-[16%]'>
            <h1>Status</h1>
          </div>
          <div className='max-w-none md:w-[5%] hidden md:block'>
            <h1><FaUserLarge /></h1>
          </div>
        </div>
        {allOrders && allOrders.map((item, index)=>(
          <div key={index} className='w-full my-4 px-4 rounded flex py-2 bg-zinc-800 justify-between items-center gap-4 hover:cursor-pointer'>
          <div className='w-[3%]'>
          <h1 className='text-center'>{index+1}</h1>
        </div>
        <div className='w-[22%]'>
          <Link to={`/view-book-details/${item.book._id}`}
          className='hover:text-blue-300'>
          {item?.book?.title}
          </Link>
        </div>
        <div className='w-[45%]'>
          <h1>{item?.book?.desc.slice(0,50)}...</h1>
        </div>
        <div className='w-[9%]'>
          <h1>₹ {item?.book?.price}</h1>
        </div>
        <div className='w-[16%]'>
        <h1 className='font-semibold'> 
          <button
            className='hover:scale-105 transition-all duration-300'
            onClick={() => {
              setOptions(options === index ? -1 : index)
              submitChangers(index);
            }
            }
          >
            {item.status === "Order Placed" ? (
              <div className='text-green-500'>{item?.status}</div>
            ) : item.status === "Canceled" ? (
              <div className='text-red-500'>{item.status}</div>
            ) : (
              <div className='text-yellow-500'>{item.status}</div>
            )}
          </button>
          <div className={`${options === index ? "block" : "hidden"} flex mt-4`}>
            <select name="status" id="" className='bg-gray-800' onChange={change} value={values?.status}>
              {["Order Placed", "Out for delivery", "Delivered", "Canceled"].map((items, i) => (
                <option value={items} key={i}>{items}</option>
              ))}
            </select>
            <button className='text-green-500 hover:text-pink-600 mx-2'>
              <FaCheck />
            </button>
          </div>
        </h1>
      </div>
        <div className='max-w-none md:w-[5%] hidden md:block'>
          <button className='text-xl hover:text-orange-500'
          onClick={()=> {
            setuserDiv("fixed");
            setuserDivData(item.user);
          }}><IoOpenOutline /></button>
        </div>
        </div>
        ))}
        
        </div>
      )}
    </div>
  )
}

export default AllOrder