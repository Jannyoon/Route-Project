import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';
import { getAuthChanged } from '../api/firebase';

import { TbSquarePlus2 } from "react-icons/tb";
import useUserInfo from '../hook/useUserInfo';
import useServerProducts from '../hook/useServerProducts';
import { getAllList } from '../api/getfireStore';
import { useProductsContext } from '../context/useProductsContext';
import SearchBar from '../component/SearchBar';

export default function Navbar() {
  const {user, Login, LogOut} = useAuthContext();
  const {userProfile} = useUserInfo();

  let getProfile = userProfile.data;

  const navigate = useNavigate();
  const handleHomeClick = ()=> navigate('/');
  const handleLogInClick = ()=>navigate('join');
  const handleAddStory = ()=> navigate('/me/add-story');

  //getServerProducts는 useInfiniteQuery를 사용해, 최신 업데이트 상품 순으로 정보를 받아옴
  //해당 정보가 달라지지 않는 이상, productData는 고정값으로 사용하겠다.
  return (
    <div className='flex justify-between mt-3'>
      <div className='flex justify-center items-end'>
        <div 
          className='text-brand font-bold text-xl md:text-4xl text-center mr-1 md:mr-5 hover:cursor-pointer'
          onClick={handleHomeClick}
        >roout</div>
        <div 
          className='text-sm md:text-base text-center pb-1 mx-1 hover:cursor-pointer'
          onClick={()=>navigate('story')}
        >스토리</div>        
      </div>
      <div className='flex justify-center items-center'>
        <SearchBar/>
        {user && (<div className='mx-1 md:mx-3 hover:cursor-pointer text-2xl md:text-3xl text-center hover:text-brand'
          onClick={handleAddStory}
        >
          <TbSquarePlus2 />
        </div>)}
        {!user && (
          <div 
          className='p-1 md:px-2 bg-brand border rounded-md hover:cursor-pointer'
          onClick={handleLogInClick}  
        >로그인</div>)}
        {user && getProfile && (
          <img 
            className='w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 border-4 rounded-full hover:border-brand hover:animate-spin hover:cursor-pointer' 
            src={getProfile['profile_picture']}
            onClick={()=>navigate('me')}
          />
        )}
      </div>
    </div>
  );
}

