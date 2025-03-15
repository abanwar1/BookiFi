import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import SeeUserData from './SeeUserData';

const AllOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1); // Tracks which dropdown is open
  const [currentStatus, setCurrentStatus] = useState(""); // Tracks selected status
  const [userDiv,setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/get-all-orders`, { headers });
      setAllOrders(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Fetch orders only once when the component mounts

  // Update status
  const submitChangers = async (index) => {
    try {
      const id = allOrders[index]._id;
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/update-status/${id}`,
        { status: currentStatus }, // Pass the updated status
        { headers }
      );
  
      alert(response.data.message);
  
      // Update local state or re-fetch the orders
      fetchOrders();
      setOptions(-1); // Close the dropdown
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status.");
    }
  };
  

  return (
    <>
    <div>
      {allOrders && allOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">All Orders</h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            {/* Header */}
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[22%] ml-3">Books</div>
            <div className="w-[45%]">Description</div>
            <div className="w-[9%]">Price</div>
            <div className="w-[16%]">Status</div>
            <div className="max-w-none md:w-[5%] hidden md:block">
              <FaUserLarge />
            </div>
          </div>

          {allOrders.map((item, index) => (
            <div
              key={index}
              className="w-full my-4 px-4 rounded flex py-2 bg-zinc-800 justify-between items-center gap-4 hover:cursor-pointer"
            >
              <div className="w-[3%] text-center">{index + 1}</div>
              <div className="w-[22%]">
                <Link to={`/view-book-details/${item.book._id}`} className="hover:text-blue-300">
                  {item?.book?.title}
                </Link>
              </div>
              <div className="w-[45%]">{item?.book?.desc.slice(0, 50)}...</div>
              <div className="w-[9%]">₹ {item?.book?.price}</div>
              <div className="w-[16%]">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    setOptions(options === index ? -1 : index);
                    setCurrentStatus(item.status); // Set current status for the dropdown
                  }}
                >
                  {item.status === "Order Placed" ? (
                    <div className="text-green-500">{item?.status}</div>
                  ) : item.status === "Canceled" ? (
                    <div className="text-red-500">{item.status}</div>
                  ) : (
                    <div className="text-yellow-500">{item.status}</div>
                  )}
                </button>
                <div className={`${options === index ? "block" : "hidden"} flex mt-4`}>
                  <select
                    name="status"
                    className="bg-gray-800"
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    value={currentStatus}
                  >
                    {["Order Placed","Out for Delivery","Delivered","Canceled"].map((status, i) => (
                      <option value={status} key={i}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    className="text-green-500 hover:text-pink-600 mx-2"
                    onClick={() => submitChangers(index)}
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
              <div className="max-w-none md:w-[5%] hidden md:block">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(item.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    {userDivData && (
      <SeeUserData userDivData = {userDivData} userDiv={userDiv} setuserDiv={setuserDiv}/>
    )}
    </> 
  );
};

export default AllOrder;
