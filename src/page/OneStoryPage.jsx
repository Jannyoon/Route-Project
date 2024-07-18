import React from 'react';
import { useLocation } from 'react-router-dom';
import StoryCardContents from '../component/StoryCardContents';

export default function OneStoryPage() {
  const state = useLocation().state;

  if (state) console.log("전달된 데이터", state)
  if (!state) return (
    <div>
      Story Page
    </div>
  );

  return (
    <div className='w-full h-dvh mb-4 flex justify-center'>
      <StoryCardContents data={state}/>
    </div>
  )

}

