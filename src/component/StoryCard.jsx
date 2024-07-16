import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function StoryCard(
  {innerRef, data}) {
    const {contents, id, imgList, time, userId, userName, userProfileImg} = data;
  return (
    <div className='w-full h-4/6 lg:h-5/6 mb-3 flex flex-col justify-center items-center'>
      <div className='w-full md:w-9/12 h-full border-4 border-brand'>
        <div>{contents}</div>
        <div ref={innerRef}>{userName}</div>
        
      </div>

    </div>
  );
}

