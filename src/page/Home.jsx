import React, {Component} from 'react';
import Slider from "react-slick";
import Button from '../ui/Button';
import { LogOut } from '../api/firebase';
import { useAuthContext } from '../context/useAuthContext';
import { getAllProducts } from '../api/getfireStore';
import useServerProducts from '../hook/useServerProducts';
import styled from 'styled-components';
import Banner from '../ui/Banner';
import useUserInfo from '../hook/useUserInfo';
import ProductCard from '../component/ProductCard';

import { TbMeat } from "react-icons/tb";
import { TbApple } from "react-icons/tb";
import { PiCarrotBold } from "react-icons/pi";
import ProductKindButton from '../ui/ProductKindButton';

export default function Home() {
  const {user} = useAuthContext();
  const {userProfile} = useUserInfo();
  const {getServerProducts} = useServerProducts();
  const {data,fetchNextPage, isFetchingNextPage, hasNextPage} = getServerProducts;


  const content = data &&  data.pages.map((pagedummy)=> pagedummy.map((obj,idx)=>{
    //pagedummy.obj : [QuerySnapshot, {...스토리 정보}]
    let realData = obj[1];

    console.log("실제사용", realData);
    return <div className='w-full h-full flex justify-center'><ProductCard data={realData}/></div>
  }))


  return (
    <div className='w-full h-full bg-yellow-50 flex flex-col items-center'>
      <Banner/>
      {user && userProfile.data && 
      (<div className='w-full flex'>
        <div className='w-full mx-5 md:mx-8 text-2xl'><span className='text-brand font-'>{userProfile.data.nickName}</span>님 반가워요!</div>
      </div>)}
      <ProductKindButton/>
      <section>
        <div>실시간 인기 Top 10</div>
        <div>캐러셀1</div>  
      </section>
      <section>
        <div>새로운 상품(15개만 실시간으로 불러올 것)</div>  
        <div>캐러셀2</div>
      </section>
      <div className='w-full h-full mt-5 border-t'>
        <div className='mt-3 mx-2 mb-5 text-xl text-brand font-semibold'>전체 상품</div>
      </div>
      <section className='w-full h-full flex flex-col justify-center items-center'> {/*전체 상품 불러오기 */}
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 grid-flow-row '>{content}</div>  
        {isFetchingNextPage && <div className='w-full p-3 text-center text-xl cursor-pointer'>불러오는 중</div>}
        {hasNextPage && <div className='w-full p-3 text-center text-xl cursor-pointer' onClick={()=>fetchNextPage()}>더 보기</div>}
      </section>      
    </div>
  );
}

