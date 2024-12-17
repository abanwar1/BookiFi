import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const links = [
    {
      title:"Home",
      link:"/"
    },
    // {
    //   title:"About Us",
    //   link:"/about-us",
    // },
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
    {
      title:"Admin",
      link:"/profile"
    },
  ]
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const role = useSelector((state)=> state.auth.role);
  if(isLoggedIn === false){
    links.splice(2,3);
  }
  if(isLoggedIn === true && role === "user") {
    links.splice(4,1);
  }
  if(isLoggedIn === true && role === "admin") {
    links.splice(3,1);
  }
  
  return (
    <div className='flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
      <Link to={"/"} className='flex items-center'>
        <img  className='h-8 me-4' src="./logo1.jpg" alt="logo" />
        <h1 className='text-2xl font-semibold'>BookiFi</h1>
      </Link>
      <div className='nav-links-bokifi block md:flex items-center gap-4'>
        <div className='hidden md:flex gap-4'>
        {links.map((item,index)=>(
        <div key={index}>
          {item.title ==="Profile" || item.title === "Admin" ?(
            <Link to={item.link} className='px-4 py-1 border border-blue-500 rounded hover:text-blue-500 transition-all duration-300'  key={index}>{item.title}</Link>
          ):<Link to={item.link} className='hover:text-blue-500 transition-all duration-300'  key={index}>{item.title}</Link>}
        </div>
        ))}
        </div>
        {isLoggedIn === false && (
          <div className='hidden md:flex gap-4'>
          <Link to="/login" className='px-4 py-1 border rounded border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
          <Link to="/signup" className='px-4 py-1 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
        </div>
        )}
      </div>
    </div>
  )
}

export default Navbar