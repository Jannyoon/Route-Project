import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { IoBagCheckSharp } from "react-icons/io5";

export default function Profile({info:{email, isFarmer, nickName, profile_picture, userId, introduction='', story}}) {
  const [viewAll, setViewAll] = useState(false);
  const navigate = useNavigate();
  const prsntRef = useRef();
  let userStr;
  userStr = (introduction || '')
  .split("\n");

  //string화. 
  let convertResult = userStr && userStr.map((str)=>{
    if (str==='') return '<br>';
    return (`<p>${str}</p>`);
  }).join("");

  useEffect(()=>{
    if (convertResult && prsntRef.current){
      prsntRef.current.innerHTML = convertResult;
    }    
  },[introduction])


  const handleHidePresent = ()=>{
    setViewAll(prev => !prev);
  }

  const userInfo = {email, isFarmer, nickName, profile_picture, userId, introduction, story};

  const handleChangeNameClick = ()=>{navigate('/me/editName')};
  const handleChangeIntroduction = ()=>{navigate('/me/edit-introduction')};
  const handleChangeProfileImage = ()=>{navigate('/me/edit-profile-image')};
  const handleCartClick = ()=>{navigate("/me/cart")};

  return (
    <div className='w-10/12 md:w-9/12 mt-7 px-1 md:px-4'>
      <div className='w-full'>
        <div className='flex'> {/*1*/}
          <img 
            className='w-20 h-20 md:w-36 md:h-36 rounded-full mr-3 md:mr-5 hover:cursor-pointer hover:scale-105'
            src={profile_picture}
            onClick={handleChangeProfileImage}/>
          <div className='grow h-20 md:h-36'
            style={!viewAll ? {'overflow':'hidden'}:{'height':'100%'}}
          > {/*overflow-hidden 관리 */}
            <div className='h-full w-full flex flex-col'>
              <div className='flex justify-end'>
                <p className='text-xs md:text-sm border rounded-lg p-1 mb-2 hover:bg-slate-50 hover:cursor-pointer'
                  onClick={handleChangeIntroduction}
                >자기소개 수정하기</p>
              </div>
              <div>
                <div className='flex flex-col h-full items-start'>
                  <div 
                    className='grow-0 flex items-center text-sm md:text-lg font-semibold mb-1 pb-1 hover:cursor-pointer hover:text-brand'
                    onClick={handleChangeNameClick}
                  >
                    <p className='mx-1'>{nickName}</p>
                    {isFarmer && <IoBagCheckSharp className='text-brand'/>}
                  </div>
                  <div 
                    ref = {prsntRef}
                    className='text-xs md:text-base'
                    style={viewAll ? {'height':'100%'}:{}}
                    id="presentation"  
                  >
                  </div> {/* innerHtml이 들어가는 DOM*/}              
                </div>
              </div>
            </div> 
          </div>
        </div>{/*1차 flex가 끝인 영역 */}
      {/*더보기 창을 눌렀을 때 통째로 붙여넣을 페이지*/}  
        <div className='flex justify-end my-2'>
          <p 
            className='hover:text-fcs hover:cursor-pointer'
            onClick={handleHidePresent}>
              {viewAll ? "접기" : "더보기"}
          </p>
        </div> {/*useState 값에 따라 접기, 더보기 교차 */}
        <div className='w-full flex justify-center gap-2'>
          <Button text={"장바구니"} onClick={handleCartClick}/>
          <Button text={"배송 정보"}/>
        </div>  
      </div>        
    </div>
  );
}

