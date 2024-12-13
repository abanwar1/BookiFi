import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BookCard from "../BookCard/BookCard"

const Favourites = () => {
  const [favourite, setFavourite] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(()=>{
    const fetch = async() =>{
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books",{headers});
      setFavourite(response?.data?.data);
    }
    fetch();
  },[favourite])
  
  return (
    <>
    {favourite && favourite.length === 0 &&(
      <div>No Favourite Books</div>
    )}
    <div className='grid grid-cols-4 gap-4'>
      {favourite && favourite.map((items, index)=>(
        <div key={index}>
          <BookCard items={items} fav={true}/>
        </div>
      ))}
    </div>
    </>
  )
}

export default Favourites