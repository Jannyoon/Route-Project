import React from 'react';
import { useInView } from 'react-intersection-observer';
import StoryCarousel from './StoryCarousel';

export default function StoryCard(
  {innerRef, data}) {
    const {contents, id, imgList, time, userId, userName, userProfileImg} = data;
  return (
    <div className='w-full h-4/6 lg:h-5/6 mb-3 flex flex-col justify-center items-center'>
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
          </div>
          <div className='text-sm md:text-xs px-3 py-1'>이미지 개수 체크용: {imgList.length}</div>
          <div className='text-sm md:text-xs px-3 py-1 overflow-y-auto'>{contents}</div>
        </div>
      </div>
    </div>
  );
}

