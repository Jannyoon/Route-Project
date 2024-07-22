import React from 'react';

import { TbMeat } from "react-icons/tb";
import { TbApple } from "react-icons/tb";
import { PiCarrotBold } from "react-icons/pi";

export default function ProductKindButton() {
  return (
    <div className='w-full mt-5 border-t'>
      <div className='my-2 mx-2 text-lg'>상품 유형별 바로가기</div>
      <div className='flex w-full justify-center'>
        <div className='flex flex-col justify-center items-center cursor-pointer hover:text-brand hover:scale-105'>
          <TbApple className='border w-14 h-14 md:w-24 md:h-24 rounded-full p-2 md:p-6'/>
          <div className='text-sm'>과일</div>
        </div>
        <div className='flex flex-col justify-center items-center mx-12 cursor-pointer hover:text-brand hover:scale-105'>
          <PiCarrotBold  className='border w-14 h-14 md:w-24 md:h-24 rounded-full p-2 md:p-6'/>
          <div className='text-sm'>채소</div>
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer hover:text-brand hover:scale-105'>
          <TbMeat className='border w-14 h-14 md:w-24 md:h-24 rounded-full p-2 md:p-6'/>
          <div className='text-sm'>기타</div>
        </div>
      </div>
  </div>
  );
}

