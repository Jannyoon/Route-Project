import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../api/firebase';

export default function EditUserName() {
  const [isTyping, setIsTyping] = useState(false);
  const [newName, setNewName] = useState(''); 
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const userInfo = useLocation().state;
  console.log("받아온 정보", userInfo);

  const handleFocusIn = (e)=>{
    setIsTyping(true);
    console.log("들어감");
  }

  const handlerFocusOut = (e)=>{
    setIsTyping(false);
    console.log("나옴");
    console.log("현재 저장된 name", newName);
  }

  const handleChange = (e)=>{
    setNewName(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (newName.length<1){
      alert("닉네임은 1글자 이상 입력해주세요.");
      return;
    }
    setNewName('');
    setIsTyping(false);
    setIsUpdating(true);
    updateUserInfo(userInfo, "nickName", newName)
    .then(()=>{
      setIsSuccess(true);
      setTimeout(()=>setIsSuccess(false), 3000)
    })
    .finally(()=>setIsUpdating(false));
    console.log("update완료");
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack 
          className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
          onClick={()=>navigate('/me')}
        />
        <div className='text-xs md:text-lg'>별명 변경하기</div>
        <PiDotsThreeVerticalBold className='text-xl md:text-3xl invisible'/>
      </div>
      <form 
        className='relative mt-6 w-3/5 md:mt-10 md:w-5/12 flex flex-col justify-center items-center'
        onSubmit={handleSubmit}
      >
        <input 
          className='w-full border py-1 px-3 focus:outline-fcs' 
          type='text'
          placeholder='새로운 별명'
          value={newName}
          onChange = {handleChange}
          onFocus = {handleFocusIn}
          onBlur = {handlerFocusOut}
          disabled = {isUpdating}
        />
        {isTyping &&
        (<div className='absolute text-fcs text-xs -top-2 left-2 bg-white px-1'>새로운 별명</div>)}
        {isUpdating && (<div className='mt-2 text-sm'>닉네임 변경 중...</div>)}
        {isSuccess && (<div className='mt-2 text-sm'>닉네임 변경 성공 ✅</div>)}
      </form>
    </div>
  );
}

