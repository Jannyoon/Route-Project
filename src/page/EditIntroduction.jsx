import React, {useEffect, useReducer, useRef, useState} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function EditIntroduction() {
  const navigate = useNavigate();
  const [introduction, setIntroduction] = useState('');
  const [isAble, setIsAble] = useState(true);
  const [textCount, setTextCount] = useState(0); //타이핑을 칠 때마다 띄워주는 용도
  
  const realTextRef = useRef();
  const hiddenTextRef = useRef();
  
  useEffect(()=>{
    console.log(textCount);
  },[textCount])

  if (hiddenTextRef.current){
    hiddenTextRef.current.style.height = 'auto';
    console.log(hiddenTextRef.current.style)
  }

  if (realTextRef.current){
    console.log("현재 height", realTextRef.current.style.height)
    const target = hiddenTextRef.current.scrollHeight+40
    realTextRef.current.style.height = `${target<520 ? 520 : hiddenTextRef.current.scrollHeight+40}px`;
  }
  
  const handleTextChange = (e)=>{
    setIntroduction(e.target.value);
    setTextCount(e.target.value.length);
  }

  const handleFocus = (e)=>{
    console.log('동작하나');
    console.log(e.target);
    //e.target.scrollIntoView({behavior:"smooth", block:"end"});
  }


  //console.log(hiddenTextRef.current.scrollHeight);
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack 
          className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
          onClick={()=>navigate('/me')}
        />
        <div className='text-xs md:text-lg'>자기소개 변경하기</div>
        <FaCheck  className='text-lg md:text-2xl hover:cursor-pointer hover:text-brand invisible'/>
      </div>
    <div className='relative w-10/12 my-6'>
      <textarea className="border w-full  p-4 h-520" 
        value={introduction}
        onChange={handleTextChange}
        ref={realTextRef}
        style={{
          'overflow-y':'hidden'
        }}
      />
      <textarea 
        className='absolute disable:true bg-blue-200 top-40 right-96 invisible'
        value={introduction}
        id='hidden'
        ref={hiddenTextRef}
      />
      <div></div>
    </div>
    <div className='fixed flex justify-center items-center gap-2 
        bottom-8 right-4 py-2 px-3
        md:bottom-5 md:right-40 md:py-3 md:px-4
        bg-brand hover:cursor-pointer hover:scale-105 hover:font-semibold
        rounded-lg text-white text-sm '>
        <FaCheck/>      
        <p>저장</p>
    </div>
  

    </div>     
  );
}

