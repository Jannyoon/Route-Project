import React, { useEffect, useRef, useState } from 'react';
import { getNextReviews } from '../api/getfireStore';
import { useInView } from 'react-intersection-observer';
import useServerStory from '../hook/useServerStory';
import StoryCard from '../component/StoryCard';

export default function Story() {
  const storyRef = useRef();
  const { ref, inView } = useInView();
  const {getItems} = useServerStory();
  const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} = getItems && getItems;
  const [loadView, setLoadView] = useState(false);

  console.log(data);//{pageParams, pages}
  console.log("다음 페이지 존재 여부?", hasNextPage);

  const content = data && data.pages.map((pagedummy)=> pagedummy.map((obj,idx)=>{
    let realData = obj[1];
    //console.log("realdata", realData);
    console.log("현재 idx", idx);
    console.log("obj 길이", obj.length);
    if (obj.length===(idx+1)) return (<StoryCard innerRef={ref} data={realData}/>)
    return <StoryCard data={realData}/>
  }))



  useEffect(()=>{
    let time;
    if (inView && hasNextPage){ //로딩 화면을 띄우기 위해서
      setLoadView(true); 
      time = setTimeout(()=>{
        fetchNextPage()
        setLoadView(false);
      }, 1000);
    }
    return (()=>{time=undefined});

    //해당 ref가 보여지는가 안 보여지는가의 여부인가요..?
  }, [inView, hasNextPage]);
  


  if (status && status==='error') return <div>Error: {error}</div>;
  return (
    <div ref={storyRef} className='w-full h-dvh mb-4'>
      {status==='pending' && <div>실행 중...</div>}
      <div className='w-full h-full'>
        {data && content}{' '}
        {loadView  && (<h3 className='w-full text-center my-2'>스토리를 불러오는 중...</h3>)}
      </div>
    </div>
  );
}

