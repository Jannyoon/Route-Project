import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';
import { getUserProfile } from '../api/firebase';

export default function Navbar() {
  const {user} = useAuthContext();
  const [userProfile, setUserProfile] = useState();
  
  useEffect(()=>{
    if (user){
      getUserProfile(user.uid)
      .then(result =>{
       //console.log("useEffect", result);
       setUserProfile(result);
      });
    }
  },[user])

  const navigate = useNavigate();
  const handleHomeClick = ()=> navigate('/');
  const handleLogInClick = ()=>navigate('join');
  console.log("navbar 프로필", userProfile);


  return (
    <div className='flex justify-between mt-3'>
      <div className='flex justify-center items-end'>
        <div 
          className='text-brand font-bold text-3xl md:text-4xl text-center mr-1 md:mr-5 hover:cursor-pointer'
          onClick={handleHomeClick}
        >roout</div>
        <div 
          className='text-sm md:text-base text-center pb-1 hover:cursor-pointer'
          onClick={()=>navigate('story')}
        >스토리</div>        
      </div>
      <div className='flex justify-center items-center'>
        <input 
          className='w-24 h-6 md:w-60 bg-transparent border-b-2 border-brand ' placeholder='검색' disabled/>
        <div className='mx-1 md:mx-3 hover:cursor-pointer'>S+</div>
        {!user && (
          <div 
          className='p-1 md:px-2 bg-brand border rounded-md hover:cursor-pointer'
          onClick={handleLogInClick}  
        >로그인</div>)}
        {user && userProfile && (
          <img 
            className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-4 rounded-full hover:border-brand hover:animate-spin hover:cursor-pointer' 
            src={userProfile['profile_picture']}
          />
        )}
      </div>
    </div>
  );
}

