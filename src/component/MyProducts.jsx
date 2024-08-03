import React, { useState, useEffect, useRef } from 'react';
import useServerProducts from '../hook/useServerProducts';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useUserInfo from '../hook/useUserInfo';

export default function MyProducts() {
  const contentRef = useRef();
  const {ref, inView} = useInView();
  const navigate = useNavigate();
  const [loadView, setLoadView] = useState(false);
  const {userProfile} = useUserInfo();
  const {getServerFarmerProducts} = useServerProducts();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = getServerFarmerProducts;


  let [email, isFarmer, nickName, profile_picture, userId, introduction, story] = ['','','','','','',''];
  const getProfile = userProfile.data;

  if (getProfile){
    [email, isFarmer, nickName, profile_picture, userId, introduction, story] = 
    [
      getProfile.email,
      getProfile.isFarmer,
      getProfile.nickName,
      getProfile.profile_picture,
      getProfile.userId,
      getProfile.introduction,
      getProfile.story   //초기 설정하지 않은 유저의 introducton은 undefined로 할당될 것이다.
    ];
  }

  
  //pagedummy 또한 배열
  const content = data && data.pages.map((pagedummy)=> pagedummy.map((obj, idx)=>{
    let realData = obj[1];
    const {productId} = realData;
    const sendData = {...realData,  
      farmerId:userId, 
      farmerImg:profile_picture, 
      farmerName:nickName
    }

    if (obj.length===(idx+1)) return (
      <div onClick={()=>{
        navigate(`/product/:${productId}`, {state:sendData})
      }}
        ref={ref} className='flex justify-center border mt-4 mr-1 py-2 cursor-pointer hover:bg-brand'>
        <img className="w-36 h-36 md:w-72 md:h-72" src={realData.imgFirst}/>
      </div>
    );
    return (
      <div onClick={()=>{
        navigate(`/product/:${productId}`, {state:sendData})
      }}
        className='flex justify-center border mt-4 mr-1 py-2 cursor-pointer hover:bg-brand'>
        <img className="w-36 h-36 md:w-72 md:h-72" src={realData.imgFirst}/>
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

  return (
    <div className=' w-full h-96 flex flex-col justify-center items-center'>
      <div className='w-10/12 md:w-9/12 flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center text-sm md:text-base'>
          <p>등록된 상품이 없습니다.</p>
          <p>상품을 등록하고 판매를 시작해 보세요!</p>
        </div>
      </div>
    </div>
  );
}

