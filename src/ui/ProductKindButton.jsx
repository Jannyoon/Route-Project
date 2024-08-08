import React from 'react';

import { TbMeat } from "react-icons/tb";
import { TbApple } from "react-icons/tb";
import { PiCarrotBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

export default function ProductKindButton() {
  const navigate = useNavigate();

  const handleClick = (text)=>{
    navigate(`/products/kindfilter/${text}`, {state:text})
  }

  return (
    <div className='w-full mt-5 border-t pt-2 pb-2'>
      <div className='my-2 mx-2 text-lg font-semibold'>상품 유형별 바로가기</div>
      <div className='flex w-full justify-center'>
        <div className='flex flex-col justify-center items-center cursor-pointer hover:text-brand hover:scale-105'
          onClick={()=>handleClick("과일")}
        >
          <TbApple className='border w-14 h-14 md:w-24 md:h-24 rounded-full p-2 md:p-6 bg-red-50'/>
          <div className='text-sm'>과일</div>
        </div>
        <div className='flex flex-col justify-center items-center mx-12 cursor-pointer hover:text-brand hover:scale-105'
          onClick={()=>handleClick("채소")}
        >
          <PiCarrotBold  className='border w-14 h-14 md:w-24 md:h-24 rounded-full p-2 md:p-6  bg-lime-50'/>
          <div className='text-sm'>채소</div>
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer hover:text-brand hover:scale-105'
          onClick={()=>handleClick("기타")}
        >
          <TbMeat className='border w-14 h-14 md:w-24 md:h-24 rounded-full p-2 md:p-6 bg-blue-50'/>
          <div className='text-sm'>기타</div>
        </div>
      </div>
  </div>
  );
}

