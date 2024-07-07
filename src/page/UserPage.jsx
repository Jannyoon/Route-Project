import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import useUserInfo from '../hook/useUserInfo';
import { IoIosArrowBack } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Profile from '../component/Profile';
import UserStory from '../component/UserStory';

export default function UserPage() {
  const {user} = useAuthContext();
  const {userProfile} = useUserInfo();
  let [email, isFarmer, nickName, profile_picture, userId] = ['','','','',''];
  const getProfile = userProfile.data;
  if (getProfile){
    console.log("유저 정보", getProfile);
    [email, isFarmer, nickName, profile_picture, userId] = Object.values(getProfile);
  }

  const userInfo = {email, isFarmer, nickName, profile_picture, userId}; 
  console.log(userInfo);
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack className='text-xl md:text-3xl'/>
        <div className='text-xs md:text-lg'>{getProfile ? getProfile.nickName : "User"}</div>
        <PiDotsThreeVerticalBold className='text-xl md:text-3xl'/>
      </div>
      <Profile info={userInfo}/>
      <div className='w-full flex gap-2 mt-7 md:mt-10'>
        {/*useState로 값을 저장하고, useStory에 저장하는 방식을 취하면 된다. 
        해당 프로젝트에선 Story까지만 구현할 예정이다.*/}
        <div className='border px-2 rounded-md hover:cursor-pointer hover:bg-slate-100'>Story</div>     
        <div className='border px-2 rounded-md hover:cursor-pointer hover:bg-slate-100'>리뷰</div>   
      </div>
      <UserStory/>
    </div>
  );
}

