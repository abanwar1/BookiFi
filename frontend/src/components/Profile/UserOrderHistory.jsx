import React,{useEffect,useState} from 'react'
import axios  from 'axios'
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const[orderHisorty ,setorderHistory] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(()=>{
    const fetch = async ()=>{
     const response =  await axios.get("http://localhost:1000/api/v1/get-order-history",{headers});
     setorderHistory(response?.data?.data);
    }
    fetch();
    
  },[])
  return (
    <>
      {orderHisorty && orderHisorty.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>No Order History</h1>
          </div>
        </div>
      )}
      {orderHisorty && orderHisorty.length>0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xlfont-semibold text-zinc-500 mb-8'>Your Order History</h1>
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
            <h1>Mode</h1>
          </div>
        </div>
        
        {orderHisorty.map((item, index)=>(
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
            <h1>{item.status === "Order Placed"?(
              <div className='text-green-500'>{item?.status}</div>
            ):item.status === "Canceled" ? (
              <div className='text-red-500'>{item.status}</div>
            ):(
              <div className='text-yellow-500'>{item.status}</div>
            )}</h1>
          </div>
          <div className='max-w-none md:w-[5%] hidden md:block'>
            <h1>COD</h1>
          </div>
          </div>
        ))}
        </div>
      )}
    </>
  )
}

export default UserOrderHistory