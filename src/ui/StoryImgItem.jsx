import React from 'react';

export default function StoryImgItem({src, width, height}) {
  return (
    <div className='flex flex-shrink-0 justify-center bg-black'
      style={{'width':`${width}px`, 'height':`${height}px`}}
    >
      <img src={src} className='w-full md:w-4/5 lg:w-4/6 h-full'/>
    </div>
  );
}

