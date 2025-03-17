import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Settings = () => {
  const [value,setValue] = useState({address:""});
  const [profileData,setProfileData] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(()=>{
    const fetch = async() =>{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-information`,{headers});
      setProfileData(response?.data);
      setValue({address:response?.data?.address});
      
    }
    fetch();
  },[])
  const change = (e) => {
    const { name, value } = e.target; 
    setValue({ ...value, [name]: value });
  };
  const handleUpdate = async () => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/update-address`,value,{headers});
    alert(response?.data?.message);
    
  }
  return (
    <>
  {profileData && (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
      <div className="space-y-6">
        {/* First Row */}
        <div className="flex gap-12">
          <div className="flex-1">
            <label htmlFor="">Username</label>
            <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{profileData?.username}</p>
          </div>
          <div className="flex-1">
            <label htmlFor="">Email</label>
            <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{profileData?.email}</p>
          </div>
        </div>

        {/* Second Row */}
        <div>
          <label htmlFor="">Address</label>
          <textarea
            className="w-full p-2 rounded bg-zinc-800 mt-2 font-semibold"
            placeholder="Address"
            rows={5}
            name="address"
            value={value?.address}
            onChange={change}
          />
        </div>

        {/* Third Row */}
        <div className="flex justify-end">
          <button
            className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )}
</>

  )
}

export default Settings