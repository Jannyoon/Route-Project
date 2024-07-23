import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import KeyWordsView from '../ui/KeyWordsView';
import { useAuthContext } from '../context/useAuthContext';
import ProductCarousel from '../ui/ProductCarousel';
import ShareButton from '../component/ShareButton';

export default function ProductDetail() {
  const {user} = useAuthContext();
  const [viewDetail, setViewDetail] = useState(false);
  const [count, setCount] = useState(0);

  const product = useLocation().state;
  const {buy, 
    farmerId, 
    farmerImg, 
    farmerName, 
    favorite, 
    firstKind, 
    imgList, 
    keyword, 
    option, 
    productDetail, 
    productId,
    secondKind, 
    title} = product;

  const titlePrice = option.split(",")[0].split(":");


  const handleViewClick = ()=>setViewDetail(prev => !prev);
  //console.log(product);
  return (
    <div className='w-full flex flex-col items-center'>
      {/*상품 판매 란*/}
      <div className='w-full flex justify-between p-1 border-b mb-2'>
        <div>d</div>
        <h1>판매자 - {farmerName}</h1>
        <div className='invisible'>d</div>
      </div>
      <div className='w-full h-full flex justify-center mb-3' >
        <div className='w-full md:w-1/2 md:h-1/2 md:basis-1/2 grow-0 p-3'>
          {imgList.length===1 && 
            <div className='w-full h-full bg-slate-50'>
              <img className="w-full h-64 object-contain" src={imgList[0]}/>
            </div>
          }
          {imgList.length>1 && <ProductCarousel imgList={imgList}/>}
        </div>
      </div>
     <div className='w-full md:w-8/12 h-full'>
      <KeyWordsView str={keyword}/>
      <div className='w-full h-full flex justify-between p-2 text-xl md:text-2xl '>
        <div className='grow-0  font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{title}</div>
        <div className='shrink-0'>{titlePrice[1]??3000} ₩</div>
      </div>
      {!viewDetail && <div className='w-full p-2 text-center border cursor-pointer' onClick={handleViewClick}>상품 상세 정보 보기</div>}

      {viewDetail &&
        <div className='bg-yellow whitespace-pre-wrap'>
          <div>{productDetail}</div>
          <div className='w-full text-end cursor-pointer hover:text-fcs' onClick={handleViewClick}>접기</div>
        </div>
      }
      {/*옵션, 상품 갯수 선택, 관심상품, 장바구니 추가 파트*/}
      {!user && <div className='p-2 text-center border'>로그인 후 이용해주세요</div>}
      <div className='flex justify-end gap-2 my-1 items-center'>
        <ShareButton product={product}/>
        <div>관심 표시</div>
      </div>
    </div>
  </div>
  );
}

