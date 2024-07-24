import React, { useRef } from 'react';
import useOtherUserInfo from '../hook/useOtherUserInfo';
import { IoBagCheckSharp } from "react-icons/io5";

export default function FarmerProfile({farmerId}) {
  //realtime Database에서 farmerId에 해당하는 유저 정보를 검색한다.
  //유저 정보에 해당하는  
  const id = farmerId;
  const {otherUserInfo} = useOtherUserInfo(id);

  let farmer;
  if (otherUserInfo.data) farmer = otherUserInfo.data
  //profile_picture, nickName, isFarmer, introduction


  return (
    <div className='my-10 w-full h-1/3 flex justify-center items-center'>    
      {farmer && <>        
        <div className='w-full h-full flex justify-center'>
          <img className='size-1/4 md:size-1/5 rounded-full p-1 md:p-5' src={farmer.profile_picture}/>
          <div className='basis-2/3  pt-7 px-5'>
            <div className='flex justify-between items-center pb-2'>
              <div className='flex items-center '>
                <div className='font-semibold text-sm md:text-lg'>{farmer.nickName}</div>
                {farmer.isFarmer && <IoBagCheckSharp className='mx-1 text-brand'/>}    
              </div>
              <div className='text-white px-1 rounded-md bg-red-500 text-xs md:text-base'>팔로우</div>
            </div>
            {!farmer.isFarmer && <p className='text-xs'>{`(현재 판매자가 아닌 계정입니다.)`}</p>}    
            <div className='border-t mt-3 pt-3'>{farmer.introduction}</div>
          </div>
        </div>


      </>
      }
    </div>
  )
}

