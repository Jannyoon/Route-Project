import React, { useEffect, useRef, useState } from 'react';
import { getNextReviews } from '../api/getfireStore';
import { useInView } from 'react-intersection-observer';
import useServerStory from '../hook/useServerStory';
import StoryCard from '../component/StoryCard';

export default function Story() {
  const { ref, inView } = useInView();
  const { getAllStoryItems} = useServerStory();
  const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} =  getAllStoryItems;
  const [loadView, setLoadView] = useState(false);

  //console.log(data);//{pageParams, pages}

  const content = data && data.pages.map((pagedummy)=> pagedummy.map((obj,idx)=>{
    //pagedummy.obj : [QuerySnapshot, {...스토리 정보}]
    let realData = obj[1];
   
    //불러온 페이지 문서의 마지막 문서 => obj.length===(idx+1)
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
  }, [inView, hasNextPage]);
  


  if (status && status==='error') return <div>Error: {error}</div>;
  return (
    <div className='w-full h-dvh mb-4'>
      {status==='pending' && <div>실행 중...</div>}
      <div className='w-full h-full'>
        {data && content}{' '}
        {loadView  && (<h3 className='w-full text-center my-2'>스토리를 불러오는 중...</h3>)}
      </div>
    </div>
  );
}

