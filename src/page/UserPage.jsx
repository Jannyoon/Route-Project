import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import useUserInfo from '../hook/useUserInfo';
import { IoIosArrowBack } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Profile from '../component/Profile';
import UserStory from '../component/UserStory';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const {user} = useAuthContext();
  const {userProfile} = useUserInfo();
  const [view, setView] = useState(false);

  const additionalView = useRef();
  const threePoint = useRef();


  const navigate = useNavigate();


  let [email, isFarmer, nickName, profile_picture, userId, introduction] = ['','','','','',''];
  const getProfile = userProfile.data;
  if (getProfile){
    console.log("유저 정보", getProfile);
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
  const handleClick = ()=>{
    navigate('/');
  }

  //ref 영역 밖을 선택했을 때 Element가 보이지 않게...
  useEffect(()=>{
    console.log(view);
    const handleClick =(e)=>{
      if (threePoint.current){
        console.log("포함하는가", threePoint.current.contains(e.target))
        if (threePoint.current.contains(e.target)) return;
        if (view && additionalView.current && !additionalView.current.contains(e.target)) setView(false);
      }
    }
    document.addEventListener('click', handleClick);

  }, [view])

  const handleAdditionalView = ()=>{
    setView(true);
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand' onClick={handleClick}/>
        <div className='text-xs md:text-lg'>{getProfile ? getProfile.nickName : "User"}</div>
        <div className='relative'>
          <div ref={threePoint}><PiDotsThreeVerticalBold 
            className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
            onClick={handleAdditionalView}
          /></div>
          {view && (
            <div className='absolute 
              flex flex-col text-center
              top-2.5 right-2 w-24 p-1
              lg:top-4 lg:right-3.5 lg:w-36
            bg-red-300 hover:cursor-pointer'
              ref={additionalView}
            >
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
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
      <UserStory/>
    </div>
  );
}

