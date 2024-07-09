import React, { useState, useEffect } from 'react';
import { VscTriangleDown } from "react-icons/vsc";
import { IoBagCheckSharp } from "react-icons/io5";
import useUserInfo from '../hook/useUserInfo';

export default function FarmerAccount({onCheck, info:{email, isFarmer, nickName, profile_picture, userId, introduction}}) {
  const userInfo = {email, isFarmer, nickName, profile_picture, userId, introduction}
  const {newSetFarmerInfo} = useUserInfo();

  const handleChangeFarmerState = ()=>{
    console.log("사용자가 클릭함");
    userInfo && newSetFarmerInfo.mutate({...userInfo, 'isFarmer':!isFarmer},
    {
      onSuccess : ()=>{
        console.log("성공적으로 전환");
        onCheck();
      }
    })}
  
  console.log("현재 유저 정보", userInfo)
  return (
    <div className='absolute w-full h-full border bg-slate-950/65
      flex flex-col items-center pt-36'>

      <div className='border w-3/5 h-80 border-white rounded-lg bg-white flex flex-col items-center'
        style={{
          '-webkit-box-shadow': '0px 2px 23px 3px rgba(0,0,0,0.77)',
          '-moz-box-shadow': '0px 2px 23px 3px rgba(0,0,0,0.77)',
          'box-shadow': '0px 2px 23px 3px rgba(0,0,0,0.77)'
        }}
      >
        <div 
          className='w-full flex flex-col items-center justify-end hover:cursor-pointer text-2xl hover:text-logout hover:bg-slate-50 rounded-t-lg'
          onClick={onCheck}
        >
          <VscTriangleDown />
        </div>
        <div className='w-full border-b font-semibold flex items-center  px-2 lg:px-3 py-1 text-xs lg:text-sm'><p className='h-full'>농어부 계정 설정하기</p></div>
        <div className='flex w-full h-full flex-col justify-around items-center p-3 lg:mt-2 mb-2'>
          <div className='flex justify-center items-center text-sm lg:text-base'
          >
            <img src={profile_picture} className='w-12 h-12 rounded-full mr-3'/>
            <p>{nickName}</p>
            {isFarmer && <p className='ml-1 text-logout'><IoBagCheckSharp /></p>}
          </div>
          <p className='text-sm lg:text-base'>현재 계정 타입은 <span className='font-semibold'>{isFarmer ? '농어부' : '일반'} 계정</span>입니다.</p>
          <div className='text-blue-500 hover:underline hover:font-semibold hover:cursor-pointer'
            onClick={handleChangeFarmerState}
          >{isFarmer ? '일반' : '농어부'} 계정으로 전환하기</div>
        </div>

      </div>
    </div>
  );
}

