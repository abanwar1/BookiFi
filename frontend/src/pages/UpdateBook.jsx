import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid:id,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async() => {
    try{
    if (!data.url || !data.title || !data.author || !data.price || !data.desc || !data.language) {
      alert('All fields are required!');
      return;
    } else {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/update-book`,data,{headers});
      console.log(response);
      setData({
      url: '',
      title: '',
      author: '',
      price: '',
      desc: '',
      language: '',
    });
    alert(response?.data?.message);
    navigate(`/view-book-details/${id}`)
  }} catch(error){
    alert(error?.response?.data?.message);
  }
  };
  useEffect(() => {
    const fetch = async () =>{
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/get-book-by-id/${id}`);
      setData(response?.data?.data)
    }
    fetch();
  }, [])
  return (
    <div className="h-[100%] p-0 md:p-4 bg-zinc-800 rounded">
      <h1 className="text-3xl md:text-xl font-semibold text-zinc-500 mb-8">Update Book</h1>
      <div className="bg-zinc-800 rounded">
        <label htmlFor="url" className="text-zinc-400 rounded">
          Image URL
        </label>
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          value={data.url}
          required
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="title" className="text-zinc-400">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          value={data.title}
          required
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="author" className="text-zinc-400">
          Author
        </label>
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          value={data.author}
          required
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="desc" className="text-zinc-400">
          Description
        </label>
        <textarea
          name="desc"
          placeholder="Short Description"
          className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          value={data.desc}
          required
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <label htmlFor="price" className="text-zinc-400">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price in rupees"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            value={data.price}
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="language" className="text-zinc-400">
            Language
          </label>
          <input
            type="text"
            name="language"
            placeholder="Language (e.g., English)"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            value={data.language}
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          className="w-[15%] bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-400"
          onClick={handleSubmit}
        >
          Update Book
        </button>
      </div>
    </div>
  )
}

export default UpdateBook