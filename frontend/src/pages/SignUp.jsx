import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    address:""
  })
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setValues({...values,[name]:value});
  }
  const submit = async () =>{
    try {
      if(values.username === "" || values.email ==="" || values.password === "" || values.address ===""){
        alert("All field are required")
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up",values)
        alert(response?.data?.message);
        navigate("/login")
        
      }
      
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-8 w-full md:w-3/6 lg:-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>
        <div>
          <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Username</label>
            <input 
            type="text" 
            placeholder='username' 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            name='username' 
            required 
            value={values?.username}
            onChange={handleChange}
            />
          </div>
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Email</label>
            <input 
            type="text" 
            placeholder='abc@gmail.com' 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            name='email' 
            required 
            value={values?.email}
            onChange={handleChange}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Password</label>
            <input 
            type="password" 
            placeholder='password' 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            name='password' 
            required 
            value={values?.password}
            onChange={handleChange}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-400'>Address</label>
            <textarea
            rows={5}
            placeholder='address' 
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            name='address' 
            required 
            value={values?.address}
            onChange={handleChange}
            />
        </div>
        <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>SignUp</button>
        </div>
        <div className='mt-4'>
            <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>Or</p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>Already have an account? &nbsp;
              <Link to={"/login"} className='hover:text-blue-500'>
              <u>LogIn</u></Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp