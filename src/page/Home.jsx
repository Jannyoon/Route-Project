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
import BestTenProducts from '../component/BestTenProducts';

export default function Home() {
  const {user} = useAuthContext();
  const {userProfile} = useUserInfo();
  const {getServerProducts} = useServerProducts();
  const {data,fetchNextPage, isFetchingNextPage, hasNextPage} = getServerProducts;


  const content = data &&  data.pages.map((pagedummy)=> pagedummy.map((obj,idx)=>{
    //pagedummy.obj : [QuerySnapshot, {...스토리 정보}]
    let realData = obj[1];
    return <div className='w-full h-full flex justify-center'><ProductCard data={realData}/></div>
  }))


  return (
    <div className='w-full h-full flex flex-col items-center'>
      <Banner/>
      {user && userProfile.data && 
      (<div className='w-full flex'>
        <div className='w-full mx-5 md:mx-8 text-2xl'><span className='text-brand font-'>{userProfile.data.nickName}</span>님 반가워요!</div>
      </div>)}
      <ProductKindButton/>
      <BestTenProducts/>
      <div className='w-full h-full mt-5 border-t'>
        <div className='mt-3 mx-2 mb-5 text-xl text-brand font-semibold'>전체 상품</div>
      </div>
      <section className='w-full h-full flex flex-col justify-center items-center'> {/*전체 상품 불러오기 */}
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 grid-flow-row '>{content}</div>  
        {isFetchingNextPage && <div className='w-full p-3 text-center text-xl cursor-pointer'>불러오는 중</div>}
        {hasNextPage && <div className='w-full p-3 text-center text-xl cursor-pointer' onClick={()=>fetchNextPage()}>더 보기</div>}
      </section>
      <div className='w-full text-xs mt-2 px-3 pt-8 pb-3'>
        <div className='my-1'>고객센터 - 배송, 취소, 교환, 반품, 환불 안내</div>
        <div className='my-1'>구글 플레이스토어 | 애플 앱스토어 | 카카오톡 | Instagram | Youtube | 블로그 | Facebook</div>
        <div className='my-1'>농어부 지원센터 | 공지사항 | 버그 제보 | 투자/제휴 문의 | 입점 문의</div>
        <div className='my-1'>기업 미션 | 이용약관 | 개인정보 처리방침 | 생산자 이용약관 | 서비스 정책</div>
        <div className='my-1'>사업자 등록번호 : xxx-xx-xxxxx</div>
        <div className='text-xs mt-5'>ROOTUE는 농어부님들과 우리 모두를 연결해주는 '수수료 없는 진짜 농수산물 직거래 플랫폼입니다. 농장에서 우리집까지 하루 만에 도착하는 신선한 농수산물의 재배과정을 직접 보고 구매하세요!</div>
      </div>      
    </div>
  );
}

