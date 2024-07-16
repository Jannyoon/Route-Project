import React from 'react';

export default function StoryCard(
  {data}) {
    const {contents, id, imgList, time, userId, userName, userProfileImg} = data;
  return (
    <div className='w-full'>
      <div>{contents}</div>
      <div>{userName}</div>
    </div>
  );
}

