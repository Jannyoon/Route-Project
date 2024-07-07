import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';


export default function Profile({info:{email, isFarmer, nickName, profile_picture, userId}}) {
  const [viewAll, setViewAll] = useState(false);
  const navigate = useNavigate();
  const prsntRef = useRef();
  let userStr;
  /*나중에 훅으로 바꿀 것*/

  userStr = 
  `DECLARATIVE & AUTOMATIC
  Writing your data fetching logic by hand is over. Tell TanStack Query where to get your data and how fresh you need it to be and the rest is automatic. It handles caching, background updates and stale data out of the box with zero-configuration.

  SIMPLE & FAMILIAR
  If you know how to work with promises or async/await, then you already know how to use TanStack Query. There's no global state to manage, reducers, normalization systems or heavy configurations to understand. Simply pass a function that resolves your data (or throws an error) and the rest is history.

  EXTENSIBLE
  TanStack Query is configurable down to each observer instance of a query with knobs and options to fit every use-case. It comes wired up with dedicated devtools, infinite-loading APIs, and first class mutation tools that make updating your data a breeze. 
  Don't worry though, everything is pre-configured for success!`
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
  },[])



  const handleHidePresent = ()=>{
    setViewAll(prev => !prev);
  }

  const userInfo = {email, isFarmer, nickName, profile_picture, userId};

  const handleChangeNameClick = ()=>{
    navigate('/me/editName',
    {
      state : userInfo
    })
  }
  return (
    <div className='w-10/12 md:w-9/12 mt-7 px-1 md:px-4'>
      <div className='w-full'>
        <div className='flex'> {/*1*/}
          <img 
            className='w-20 h-20 md:w-36 md:h-36 rounded-full mr-3 md:mr-5'
            src={profile_picture}/>
          <div className='grow h-20 md:h-36'
            style={!viewAll ? {'overflow':'hidden'}:{'height':'100%'}}
          > {/*overflow-hidden 관리 */}
            <div className='h-full w-full flex flex-col'>
              <div className='flex justify-end'>
                <p className='text-xs md:text-sm border rounded-lg p-1 mb-2'>자기소개 수정하기</p>
              </div>
              <div className='grow'>
                <div className='flex flex-col h-full items-start'>
                  <p 
                    className='grow-0 text-sm md:text-lg font-semibold mb-1 pb-1 hover:cursor-pointer hover:text-brand'
                    onClick={handleChangeNameClick}
                  >{nickName}</p>
                  <div 
                    ref = {prsntRef}
                    className='grow text-xs md:text-base'
                    style={viewAll ? {'height':'100%'}:{}}
                    id="presentation"  
                  ><div ></div>
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
          <Button text={"장바구니"}/>
          <Button text={"배송 정보"}/>
        </div>  
      </div>        
    </div>
  );
}

