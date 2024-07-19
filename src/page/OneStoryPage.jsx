import React from 'react';
import { useLocation } from 'react-router-dom';
import StoryCardContents from '../component/StoryCardContents';

export default function OneStoryPage() {
  const state = useLocation().state;
  let vh = window.innerHeight*0.01;

  if (state) console.log("전달된 데이터", state)
  if (!state) return (
    <div>
      Story Page
    </div>
  );

  return (
    <div className='w-full flex justify-center'
      style={{'height' : `${90*vh}px`}}
    >
      <StoryCardContents data={state}/>
    </div>
  )

}

