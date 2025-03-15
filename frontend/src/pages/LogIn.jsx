import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../srore/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username:"",
    password:"",
  })
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setValues({...values,[name]:value});
  }
  const submit = async () =>{
    try {
      if(!values.username || !values.password ){
        alert("Username and password required")
      } 
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/sign-in`,values,{ headers: { "Content-Type": "application/json" }})
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response?.data?.role));
        localStorage.setItem("id",response?.data?.id)
        localStorage.setItem("token",response?.data?.token)
        localStorage.setItem("role",response?.data?.role)
        navigate("/profile")
      
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-8 w-full md:w-3/6 lg:-2/6'>
        <p className='text-zinc-200 text-xl'>Login</p>
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
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-400' onClick={submit}>Login</button>
        </div>
        <div className='mt-4'>
            <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>Or</p>
            <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>Already have an account? &nbsp;
              <Link to={"/signup"} className='hover:text-blue-500'>
              <u>SignUp</u></Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default LogIn