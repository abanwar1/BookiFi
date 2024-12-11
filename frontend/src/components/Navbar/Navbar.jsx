import React from 'react'
import { Link } from 'react-router-dom'
import {FaGripLines} from "react-icons/fa"

const Navbar = () => {
  const links = [
    {
      title:"Home",
      link:"/"
    },
    {
      title:"About Us",
      link:"/about-us",
    },
    {
      title:"All Books",
      link:"/all-books",
    },
    {
      title:"Cart",
      link:"/cart",
    },
    {
      title:"Profile",
      link:"/profile"
    },
  ]
  return (
    <div className='flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
      <Link to={"/"} className='flex items-center'>
        <img  className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
        <h1 className='text-2xl font-semibold'>BookiFi</h1>
      </Link>
      <div className='nav-links-bokifi block md:flex items-center gap-4'>
        <div className='hidden md:flex gap-4'>
        {links.map((item,index)=>(
          <Link to={item.link} className='hover:text-blue-500 transition-all duration-300'  key={index}>{item.title}</Link>
        ))}
        </div>
        <div className='hidden md:flex gap-4'>
          <Link to="/login" className='px-4 py-1 border rounded border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
          <Link to="/signup" className='px-4 py-1 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar