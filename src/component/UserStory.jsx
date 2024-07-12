import React from 'react';
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
export default function UserStory() {
  const navigate = useNavigate();
  const handleAddStory = () => navigate('/me/add-story');

  //정보가 없을 경우 지정된 크기의 컴포넌트를 return. 리팩토링 필요.
  return (
    <div className=' w-full h-96 flex flex-col justify-center items-center'>
      <div className='w-10/12 md:w-9/12 flex flex-col justify-center items-center'>
        <div onClick={handleAddStory}><CiSquarePlus className='text-3xl mb-2 md:text-4xl md:mb-3 hover:scale-105 hover:text-brand hover:cursor-pointer'/></div>
        <div className='flex flex-col items-center text-sm md:text-base'>
          <p>내 요리들을 기록하고</p>
          <p>나만의 특별한 레시피와</p>
          <p>음식 관련된 소소한 꿀팁,</p>
          <p>마음에 들었던 상품의 리뷰를</p>
          <p>공유해보세요!</p>
        </div>
      </div>
    </div>
  );
}

