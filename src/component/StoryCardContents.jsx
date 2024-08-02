import React, { useEffect, useRef, useState } from 'react';
import StoryCarousel from './StoryCarousel';
import { useAuthContext } from '../context/useAuthContext';
import { PiDotsThree } from "react-icons/pi";
import { deleteUserStory } from '../api/getfireStore';

export default function StoryCardContents({innerRef, data}) {
  const [deleteView, setDeleteView] = useState(false);
  const [completeDelete, setCompleteDelete] = useState(false);

  const deleteThree = useRef();
  const additionalDelete = useRef();

  const {user} = useAuthContext();
  const {contents, id, imgList, time, userId, userName, userProfileImg} = data;
  //console.log("현재 story data 출력", data);
  
  useEffect(()=>{
    const handleClick = (e)=>{
      if (deleteView && deleteThree.current && deleteThree.current.contains(e.target)) return;
      if (deleteView && additionalDelete.current && !additionalDelete.current.contains(e.target)) setDeleteView(false);
    }
    document.addEventListener('click', handleClick);
  },[deleteView])


  const handleDeViewClick = ()=>setDeleteView(true);
  const handleDeleteClick = ()=>{
    deleteUserStory(userId, id);
    setCompleteDelete(true);
  }

  if (completeDelete){
    return (
      <div className='w-full md:w-9/12 h-full border flex flex-col items-center justify-center'>
        <div ref={innerRef}>삭제된 스토리입니다.</div>
      </div>
    )
  }

  return (
    <div className='w-full md:w-9/12 h-full border flex flex-col items-center'>
    {/*스토리 캐러셀 */}
    <StoryCarousel storyImgs={imgList}/>
    <div 
      ref={innerRef} 
      className='flex-grow-0 w-full h-2/5 border-t
      flex flex-col'
    >
      <div className='flex w-full items-center gap-2 m-3'>
        <img src={userProfileImg} className='w-16 h-16 rounded-full'/>
        <div>{userName}</div>
        <button className='text-sm px-2 bg-brand rounded-md ml-2'>팔로우</button>
        {user && user.uid===userId && (
          <div className='relative'>
            <div className='text-2xl bg-yellow cursor-pointer hover:bg-gray-100'
              onClick={handleDeViewClick}
              ref={deleteThree}
            ><PiDotsThree/></div>
            {deleteView && 
            <div className='w-20 border rounded-sm absolute p-1 top-3 left-3 text-center bg-white hover:bg-gray-100 cursor-pointer'
              ref={additionalDelete}
              onClick={handleDeleteClick}
            >삭제하기</div>}
          </div>
        )}
      </div>
      <div className='text-sm md:text-xs px-3 py-1'>이미지 개수 체크용: {imgList.length}</div>
      <div className='text-sm md:text-xs px-3 py-1 overflow-y-auto'
        onTouchStart={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
        onTouchEnd={e => e.stopPropagation()}
      >{contents}</div>
    </div>
  </div>
  );
}

