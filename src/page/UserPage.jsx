import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import useUserInfo from '../hook/useUserInfo';
import { IoIosArrowBack } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Profile from '../component/Profile';
import UserStory from '../component/UserStory';
import { useNavigate } from 'react-router-dom';
import { IoExitOutline } from "react-icons/io5";
import { useQueryClient } from '@tanstack/react-query'
import { getAuth } from 'firebase/auth';
import FarmerAccount from '../component/FarmerAccount';

export default function UserPage() {
  const {user, LogIn, LogOut} = useAuthContext();

  const auth = getAuth();
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState(true);
  console.log("현재 유저", user)
  if (!user){
    alert("회원만 이용 가능합니다.");
    navigate('/', {replace:true});
  }

  const {userProfile, logOutUser} = useUserInfo();
  const [view, setView] = useState(false);
  const [farmerAccount, setFarmerAccount] = useState(false);

  const additionalView = useRef();
  const threePoint = useRef();
  const queryClient = useQueryClient();

  let [email, isFarmer, nickName, profile_picture, userId, introduction] = ['','','','','',''];
  const getProfile = userProfile.data;
  if (getProfile){
    [email, isFarmer, nickName, profile_picture, userId, introduction] = 
    [
      getProfile.email,
      getProfile.isFarmer,
      getProfile.nickName,
      getProfile.profile_picture,
      getProfile.userId,
      getProfile.introduction   //초기 설정하지 않은 유저의 introducton은 undefined로 할당될 것이다.
    ];
  }

  const userInfo = {email, isFarmer, nickName, profile_picture, userId, introduction}; 
  const handleClick = ()=> navigate('/');
  const handleAdditionalView = ()=> setView(true);

  const handleLogOut = ()=>{
    LogOut();    
    window.location.replace('/'); 
  }

  const handleFarmerSet = ()=>{
    setFarmerAccount(prev => !prev);
    setView(prev => !prev);
  }
  

  //ref 영역 밖을 선택했을 때 Element가 보이지 않게...
  useEffect(()=>{
    console.log(view);
    const handleClick =(e)=>{
      if (threePoint.current){
        if (threePoint.current.contains(e.target)) return;
        if (view && additionalView.current && !additionalView.current.contains(e.target)) setView(false);
      }
    }
    document.addEventListener('click', handleClick);
  }, [view])



  if (!logUser || !user){
    return (
      <div>로그인 후 이용</div>
    )
  }

  return (
    <div className='relative w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand' onClick={handleClick}/>
        <div className='text-xs md:text-lg'>{getProfile ? getProfile.nickName : "User"}</div>
        <div className='relative'>
          <div ref={threePoint}>
            <PiDotsThreeVerticalBold 
              className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
              onClick={handleAdditionalView}
            />
          </div>
          {view && (
            <div className='absolute 
              flex flex-col 
              top-2.5 right-2 w-56 px-3 py-2 
              lg:top-4 lg:right-3.5 
              border rounded-lg bg-white shadow-lg
              hover:cursor-pointer'
              ref={additionalView}
            >
              <div className='flex items-center hover:text-logout hover:bg-slate-50 hover:font-semibold my-1 mb-2'>
                <IoExitOutline className='text-3xl mr-1 '/>
                <p className='text-lg' onClick={handleLogOut}>로그아웃</p>
              </div>
              <div 
                className='hover:bg-slate-50 hover:font-semibold'
                onClick={handleFarmerSet}
              >농어부/일반 계정 설정하기</div>
              <div className='hover:bg-slate-50 hover:font-semibold'>회원 탈퇴하기</div>
          </div>)}        
        </div>

      </div>
      <Profile info={userInfo}/>
      <div className='w-full flex gap-2 mt-7 md:mt-10'>
        {/*useState로 값을 저장하고, useStory에 저장하는 방식을 취하면 된다. 
        해당 프로젝트에선 Story까지만 구현할 예정이다.*/}
        <div className='border px-2 rounded-md hover:cursor-pointer hover:bg-slate-100'>Story</div>     
        <div className='border px-2 rounded-md hover:cursor-pointer hover:bg-slate-100'>리뷰</div>   
      </div>
      <UserStory />
      {farmerAccount && <FarmerAccount onCheck={handleFarmerSet} info={userInfo}/>}
    </div>
  );
}

