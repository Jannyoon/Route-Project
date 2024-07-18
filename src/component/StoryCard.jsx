import React from 'react';
import StoryCardContents from './StoryCardContents';

export default function StoryCard(
  {innerRef, data}) {
  return (
    <div className='w-full h-4/6 lg:h-5/6 mb-3 flex flex-col justify-center items-center'>
      <StoryCardContents innerRef={innerRef} data={data}/>
    </div>
  );
}

