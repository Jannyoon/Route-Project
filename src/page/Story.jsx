import React, { useEffect, useRef, useState } from 'react';
import { getNextReviews } from '../api/fireStore';
import { useInView } from 'react-intersection-observer';
import useServerStory from '../hook/useServerStory';
import StoryCard from '../component/StoryCard';

export default function Story() {
  const storyRef = useRef();
  //const { ref, inView } = useInView();
 
  const {getItems} = useServerStory();
  const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} = getItems && getItems;

  console.log(data);//{pageParams, pages}
  console.log("다음 페이지 존재 여부?", hasNextPage);

  const content = data && data.pages.map((pagedummy)=> pagedummy.map((obj)=>{
    let realData = obj[1];
    //console.log("realdata", realData);
    return <StoryCard data={realData}/>
  }))


  /*
  useEffect(()=>{
    if (inView && hasNextPage){
      console.log("Fire!")
    }
    console.log("inview 출력", inView);
    //해당 ref가 보여지는가 안 보여지는가의 여부인가요..?
  }, [inView, hasNextPage]);
  */



  if (status && status==='error') return <div>Error: {error}</div>;
  return (
    <div ref={storyRef} className='w-full h-full'>
      Story
      {status==='pending' && <div>실행 중...</div>}
      <div>
        {data && content}{' '}
      </div>
      {hasNextPage && 
      <button 
        className='bg-slate-200 w-10 mx-4'
        onClick={()=>fetchNextPage()}
      >{isFetchingNextPage ? 'Loading...':'Load more'}</button>}
    </div>
  );
}

