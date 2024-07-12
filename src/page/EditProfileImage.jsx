import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { BiImageAdd } from "react-icons/bi";

export default function EditProfileImage() {
  const [nowFile, setNowFile] = useState();
  const userInfo = useLocation().state;
  const navigate = useNavigate();
  

  const handleImgChange = (e) =>{
    e.preventDefault();
    console.log(e.target);
    const {name, value, files} = e.target;
    console.log("현재 파일 목록", files[0]);
    setNowFile(files[0]);

  }

  console.log("데이터 확인", userInfo);
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack 
          className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
          onClick={()=>navigate('/me')}
        />
        <div className='text-xs md:text-lg'>프로필 이미지 변경하기</div>
        <FaCheck  className='text-lg md:text-2xl hover:cursor-pointer hover:text-brand'/>
      </div> {/*여기까지 상단바*/}
      <div className='w-9/12 flex flex-col justify-center items-center p-10'>
          <label htmlFor='imgChange'> 
            <div className='bg-slate-200 flex justify-center items-center'
            style={{
              'width':'45vh',
              'height':'45vh',
            }}>
              {!nowFile && (<div className='text-5xl'><BiImageAdd /></div>)}
              {nowFile && <img src={URL.createObjectURL(nowFile)} className='w-full h-full'/>}
            </div>

          </label>
          <input type='file' id='imgChange'
          onChange={handleImgChange}
          style={{'display':'none'}}
          />
      </div>
    </div>
  );
}

