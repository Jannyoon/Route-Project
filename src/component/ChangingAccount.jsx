import React, { useState, useEffect } from 'react';
import { VscTriangleDown } from "react-icons/vsc";
import { IoBagCheckSharp } from "react-icons/io5";
import useUserInfo from '../hook/useUserInfo';
import { deleteUserAuth } from '../api/firebase';

export default function ChangingAccount({onCheck, info:{email, isFarmer, nickName, profile_picture, userId, introduction, story, favorite},
settingFarmer, removingUser}) {
  const userInfo = {email, isFarmer, nickName, profile_picture, userId, introduction, story: story||"", favorite:favorite||""}
  const {newSetFarmerInfo, deleteAuth} = useUserInfo();
  const {handleFarmerSet, handleView, handleRemoveAccountSet} = onCheck;
       //회원 탈퇴 로직
      //1) 로그아웃
      //2) firebase 데이터 삭제
      //2-1) farmer 정보 있으면 farmer 삭제
      //2-2)idCheck 삭제
      //2-3)USERS 정보 삭제      
      //3)계정 삭제
  const handleChangeFarmerState = ()=>{
    console.log("사용자가 클릭함");
    userInfo && newSetFarmerInfo.mutate({...userInfo, 'isFarmer':!isFarmer},
    {
      onSuccess : ()=>{
        console.log("성공적으로 전환");
        handleFarmerSet();
        handleView();
      }
    })
  }

  const handleDeleteUser = async ()=>{
    userInfo && deleteAuth.mutate(null,{
      onSuccess : (result)=>{ 
        console.log("성공", result)
      },
    });

    await deleteUserAuth();
    window.location.replace('/')
  }
  
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
          onClick={()=>{
            if (settingFarmer) handleFarmerSet();
            if (removingUser) handleRemoveAccountSet();
            handleView();
          }}
        >
          <VscTriangleDown />
        </div>
        <div className='w-full border-b font-semibold flex items-center  px-2 lg:px-3 py-1 text-xs lg:text-sm'><p className='h-full'>{removingUser ? '회원 탈퇴하기' : '농어부 계정 설정하기'}</p></div>
        <div className='flex w-full h-full flex-col justify-around items-center p-3 lg:mt-2 mb-2'>
          <div className='flex justify-center items-center text-sm lg:text-base'
          >
            <img src={profile_picture} className='w-12 h-12 rounded-full mr-3'/>
            <p>{nickName}</p>
            {isFarmer && <p className='ml-1 text-logout'><IoBagCheckSharp /></p>}
          </div>
          {
            removingUser ?
            (<p className='text-xs lg:text-base'>내가 작성한 이야기, 댓글, 내 구매내역은 삭제되지 않습니다. 미완료된 주문건에 대한 배송 추적 혹은 환불 처리를 회원 탈퇴 이전에 완료해야합니다. 적립된 루트머니를 사용하거나 회수할 수 없습니다.</p>) :
            (<p className='text-sm lg:text-base'>현재 계정 타입은 <span className='font-semibold'>{isFarmer ? '농어부' : '일반'} 계정</span>입니다.</p>)}
          <div className='text-blue-500 hover:underline hover:font-semibold hover:cursor-pointer'
            onClick={settingFarmer ? handleChangeFarmerState :  handleDeleteUser}>
            {removingUser ?
            (`회원 탈퇴하기`):
            (`${isFarmer ? '일반' : '농어부'} 계정으로 전환하기`)}
          </div>
        </div>

      </div>
    </div>
  );
}

