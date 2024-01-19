import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function Register() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  //console.log(formData);
 
  const handleSubmit = async(e)=>{
    // to prevent refreshing the page
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      setLoading(false)
      setError(false)
      console.log(data);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/login');
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Register</h1>
      <form onSubmit={handleSubmit} className='flex justify-center flex-col gap-4'>
        <input type='text' placeholder='Username' id='username'
          className='bg-slate-100 m-3 rounded-lg'
          onChange={handleChange}
        />
        <input type='email' placeholder='Email' id='email'
          className='bg-slate-100 m-3 rounded-lg'
          onChange={handleChange}
        />
        <input type='password' placeholder='Password' id='password'
          className='bg-slate-100 m-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white 
        p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "loading..." : "Register"}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 my-2'>
        <p>Have an account?</p>
        <Link to="/login">
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  )
}
