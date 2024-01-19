import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {
  const {currentUser} = useSelector(state => state.user)

  return (
    <div className='bg-black'>
        <div className='flex justify-between 
             items-center 
             max-w-6xl mx-auto p-3 text-white'>
           <Link to="/">
             <h className="font-black text-white">Auth App</h>
           </Link>
           <ul className='flex gap-4'>
              <Link to="/">
                <li>Home</li>
              </Link>
             <Link to="/about">
               <li>About</li>
             </Link>
              <Link to="/profile">
              {currentUser ? (
                <img src={currentUser.profilePicture}
                 alt='profile' 
                 className='h-7 w-7 rounded-full object-cover' />
              ):(
                <li>Login</li>
              )}   
              </Link>
              {/* <Link to="/register">
                <li>Register</li>
              </Link> */}
           </ul>
        </div>
    </div>
  )
}
