import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { loginFailure, loginStart, loginSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Login() {
  const [formData, setFormData] = useState({})
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  //console.log(formData);
 
  const handleSubmit = async(e)=>{
    // to prevent refreshing the page
    e.preventDefault()
    try {
      //setLoading(true)
      dispatch(loginStart())
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      //setLoading(false)
      //setError(false)
      //console.log(data);
      if (data.success === false) {
        //setError(true);
        dispatch(loginFailure(data.message))
        return;
      }
      dispatch(loginSuccess(data))
      navigate('/');
    } catch (error) {
      // setLoading(false)
      // setError(true)
      dispatch(loginFailure(error))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex justify-center flex-col gap-4'>
        <input type='text' placeholder='Username' id='username'
          className='bg-slate-100 m-3 rounded-lg'
          onChange={handleChange}
        />
        <input type='password' placeholder='Password' id='password'
          className='bg-slate-100 m-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white 
        p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "loading..." : "Login"}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 my-2'>
        <p>Not yet a member?</p>
        <Link to="/register">
          <span className='text-blue-500'>Register</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error || 'Something went wrong!' : ""}</p>
    </div>
  )
}
