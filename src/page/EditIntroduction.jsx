import React, {useEffect, useReducer, useRef, useState} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../api/firebase';
import useUserInfo from '../hook/useUserInfo';


export default function EditIntroduction() {
  const navigate = useNavigate();
  const [isAble, setIsAble] = useState(true);
  const [textCount, setTextCount] = useState(0); //타이핑을 칠 때마다 띄워주는 용도

  const {userProfile} = useUserInfo();
  const userInfo = userProfile.data;

  const [text, setText] = useState('');

  const realTextRef = useRef();
  const hiddenTextRef = useRef();
  
  //실시간으로 글자수 제한 CHECK
  useEffect(()=>{
    if (textCount>1500){
      setIsAble(false);
    }
    else !isAble && setIsAble(true);
  },[textCount])


  if (hiddenTextRef.current){
    hiddenTextRef.current.style.height = 'auto';
    console.log(hiddenTextRef.current.style)
  }

  if (realTextRef.current){
    console.log("현재 height", realTextRef.current.style.height)
    const target = hiddenTextRef.current.scrollHeight+40
    realTextRef.current.style.height = `${target<520 ? 520 : hiddenTextRef.current.scrollHeight+38}px`;
  }
  
  const handleTextChange = (e)=>{
    setText(e.target.value);
    setTextCount(e.target.value.length);
  }

  const handleClick = (e)=>{
    if (!isAble) return;
    updateUserInfo(userInfo, 'introduction', text)
    .then(()=>{
      setText('');
      setTextCount(0);
      alert("변경 완료");
    })

  }

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
      <textarea className="border w-full p-4 h-520 focus:outline-fcs" 
        value={text}
        onChange={handleTextChange}
        ref={realTextRef}
        style={{
          'overflow-y':'hidden',
          'resize':'none'
        }}
      />
      <textarea 
        className='absolute disable:true bg-blue-200 top-40 right-96 invisible'
        value={text}
        id='hidden'
        ref={hiddenTextRef}
      />    
      <div className='fixed w-24 h-7 
        bottom-20 right-4
        lg:top-36 lg:right-60 
        text-center border-2 border-brand bg-white rounded-lg'
        style={{'color' : isAble?'#020617':'#ef4444',
          'borderColor' : !isAble && '#6b7280'
        }}
      >{textCount}/1500</div>
    </div>
    <div className='fixed flex justify-center items-center gap-2 
        bottom-8 right-4 py-2 px-3
        lg:bottom-5 lg:right-44 lg:py-3 lg:px-4 hover:scale-105
        bg-brand hover:font-semibold
        rounded-lg text-white text-sm'
      style={{
        'backgroundColor' : !isAble ?'#6b7280':'#10B981',
        'cursor': isAble&&'pointer'
      }}
      onClick={handleClick}
    >
        <FaCheck/>      
        <p>저장</p>
    </div>

    </div>     
  );
}

