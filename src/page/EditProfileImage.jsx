import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { BiImageAdd } from "react-icons/bi";
import { cloudinaryUpload } from '../api/cloudinary';
import { updateUserInfo } from '../api/firebase';

export default function EditProfileImage() {
  const [nowFile, setNowFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const userInfo = useLocation().state;
  const navigate = useNavigate();
  

  const handleImgChange = (e) =>{
    e.preventDefault();
    console.log(e.target);
    const {name, value, files} = e.target;
    console.log("현재 파일 목록", files[0]);
    setNowFile(files && files[0]);
  }

  const handleClick = ()=>{
    if (nowFile) {
      setIsUploading(true);
      cloudinaryUpload(nowFile).then(url =>{
      updateUserInfo(userInfo,"profile_picture", url).then(()=>{
        alert("변경이 완료되었습니다.");
        navigate("/me",{replace:true})
      })
      .finally(()=>{
        setIsUploading(false)
        setNowFile(null);
      });
      
      });
    }
    else {
      alert("변경할 이미지가 없습니다.");
      return;
    }
  }

  console.log("현재 이미지", nowFile);

  console.log("데이터 확인", userInfo);
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack 
          className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
          onClick={()=>navigate('/me')}
        />
        <div className='text-xs md:text-lg'
          style={isUploading ? {'color' : '#10B981'}:{}}
        >{isUploading ? '프로필 이미지 변경 중...' : '프로필 이미지 변경하기'}</div>
        <FaCheck  className='text-lg md:text-2xl hover:cursor-pointer hover:text-brand' onClick={handleClick}/>
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

