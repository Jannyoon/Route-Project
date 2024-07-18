import React, { useEffect, useState, useRef } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';
import { IsUserStory } from '../api/getfireStore';
import useServerStory from '../hook/useServerStory';
import { useInView } from 'react-intersection-observer';
import useUserInfo from '../hook/useUserInfo';

export default function UserStory() {
  const contentRef = useRef();
  const {ref, inView} = useInView();
  const navigate = useNavigate();
  const handleAddStory = () => navigate('/me/add-story');
  const [loadView, setLoadView] = useState(false);
  const {getUserStoryItems} = useServerStory();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = getUserStoryItems;

  const {userProfile} = useUserInfo();

  
  let [nickName, profile_picture, userId] = ['','',''];
  const userInfo = userProfile.data;

  if (userInfo){
    [nickName, profile_picture, userId] = 
    [
      userInfo.nickName,
      userInfo.profile_picture,
      userInfo.userId,
    ];
  }


  //pagedummy 또한 배열
  const content = data && data.pages.map((pagedummy)=> pagedummy.map((obj, idx)=>{
    let realData = obj[1];
    const {contents, imageList, storyId, time} = realData;
    const sendData ={contents, id:storyId, imgList:imageList, time, userId, userName:nickName, userProfileImg:profile_picture};
    if (obj.length===(idx+1)) return (
      <div onClick={()=>{
        navigate(`/mystory/:${storyId}`, {state:sendData})
      }}
        ref={ref} className='flex justify-center border mt-4 mr-1 py-2 cursor-pointer hover:bg-brand'>
        <img className="w-36 h-36 md:w-72 md:h-72" src={realData.first}/>
      </div>
    );
    return (
      <div onClick={()=>{
        navigate(`/mystory/:${storyId}`, {state:sendData})
      }}
        className='flex justify-center border mt-4 mr-1 py-2 cursor-pointer hover:bg-brand'>
        <img className="w-36 h-36 md:w-72 md:h-72" src={realData.first}/>
      </div>);
  }))


  useEffect(()=>{
    let time;
    if (inView && hasNextPage){
      setLoadView(true);
      setTimeout(()=>{
        setLoadView(false);
        fetchNextPage();    
     }, 300) 
    }
    return ()=>{time=undefined}
  }, [inView, hasNextPage, loadView])

  if (!userInfo) return <div></div>
  if (data && data.pages[0].length>0){
    return (
    <div 
      ref={contentRef}
      className='flex-shrink-0 w-full h-auto pb-5'>
      <div className='grid grid-cols-3 grid-flow-row'>
          {content}{' '}
          {loadView && (<h3>Loading...</h3>)}
      </div>
    </div>
    )
  }

  //정보가 없을 경우 지정된 크기의 컴포넌트를 return. 리팩토링 필요.
  return (
    <div className=' w-full h-96 flex flex-col justify-center items-center'>
      <div className='w-10/12 md:w-9/12 flex flex-col justify-center items-center'>
        <div onClick={handleAddStory}><CiSquarePlus className='text-3xl mb-2 md:text-4xl md:mb-3 hover:scale-105 hover:text-brand hover:cursor-pointer'/></div>
        <div className='flex flex-col items-center text-sm md:text-base'>
          <p>내 요리들을 기록하고</p>
          <p>나만의 특별한 레시피와</p>
          <p>음식 관련된 소소한 꿀팁,</p>
          <p>마음에 들었던 상품의 리뷰를</p>
          <p>공유해보세요!</p>
        </div>
      </div>
    </div>
  );
}

