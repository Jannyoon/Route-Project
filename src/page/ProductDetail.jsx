import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import KeyWordsView from '../ui/KeyWordsView';
import { useAuthContext } from '../context/useAuthContext';
import Button from '../ui/Button';
import ProductCarousel from '../ui/ProductCarousel';
import ShareButton from '../component/ShareButton';
import FarmerInfo from '../component/FarmerInfo';
import { getOneProduct } from '../api/getfireStore';

export default function ProductDetail() {
  const {user} = useAuthContext();
  const [viewDetail, setViewDetail] = useState(false);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(()=>{
    let nowUrl = window.location.pathname;
    let productId = nowUrl.slice(9,);
    getOneProduct(productId)
    .then((result)=>setProduct(result));
  },[])

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

  const titlePrice = option ? option.split(",")[0].split(":") : 0;
  const optionPrice = option ? option.split(",").map((v)=>v.trim().split(":")): [""];
  console.log("옵션별로..", optionPrice);
  const [nowOption, setNowOption] = useState(optionPrice[0]); //["optionname", "${priceNum}"]
  //초기 설정 문제로 1번 idx가 없을 수 있다.
  //1번 idx가 없을 경우 3000원을 기본값으로 설정하겠다.


  const handleViewClick = ()=>setViewDetail(prev => !prev);
  //console.log(product);
  return (
    <div className='w-full flex flex-col items-center'>
      {/*상품 판매 란*/}
      <div className='w-full flex justify-between items-center p-1 border-b mb-2'>
        <IoIosArrowBack className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand' onClick={()=>navigate("/")}/>
        <h1 className='text-lg md:text-xl'>판매자 - {farmerName}</h1>
        <div className='invisible'>d</div>
      </div>
      <div className='w-full h-full flex justify-center mb-3' >
        <div className='w-full md:w-1/2 md:h-1/2 md:basis-1/2 grow-0 p-3'>
          {title && imgList.length===1 && 
            <div className='w-full h-full bg-slate-50'>
              <img className="w-full h-64 object-contain" src={imgList ? imgList[0]: ""}/>
            </div>
          }
          {title && imgList.length>1 && <ProductCarousel imgList={imgList}/>}
        </div>
      </div>
      <div className='w-full md:w-8/12 h-full mb-6'>
        <KeyWordsView str={keyword}/>
        <div className='w-full h-full flex justify-between p-2 text-xl md:text-2xl '>
          <div className='grow-0  font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{title}</div>
          <div className='shrink-0'>{titlePrice[1]??3000} ₩</div>
        </div>
        {!viewDetail && <div className='w-full p-2 text-center border cursor-pointer' onClick={handleViewClick}>상품 상세 정보 보기</div>}
        {viewDetail &&
          <div className='bg-yellow whitespace-pre-wrap'>
            <div className='bg-slate-50'>{productDetail}</div>
            <div className='w-full text-end cursor-pointer hover:text-fcs' onClick={handleViewClick}>접기</div>
          </div>
        }

        {/*옵션, 상품 갯수 선택, 관심상품, 장바구니 추가 파트*/}
        {!user && <div className='p-2 text-center border'>로그인 후 이용해주세요</div>}
        <div className='flex justify-end gap-2 my-1 items-center'>
          <ShareButton product={product}/>
          <div>관심 표시</div>
        </div>
        <div className='w-full flex flex-col items-end  border-b-2 border-brand mt-5 md:mt-10'>
          <div>
            <div className='flex items-center gap-2'>
              <div>옵션</div>
              <select >
                {option && option.split(",").map((v)=><option>{v}</option>)}
              </select>
            </div>
            <div className='flex items-center gap-2'>
              <div>개수</div>
              <input className="p-2 text-center" min={1} max={10} type='number' placeholder={0}/>
            </div>
          </div>
        </div>
        <div className='w-full text-end text-3xl text-brand p-2 font-semibold'>{(nowOption[1]??3000)*count} ₩</div>
      </div>
      <div className='w-9/12 flex justify-center'>
        <div className='w-full h-full p-4 text-center font-semibold border-2 border-brand cursor-pointer hover:bg-brand'>장바구니</div>
        <div className='w-full h-full p-4 text-center font-semibold border-2 border-brand cursor-pointer hover:bg-brand'>바로구매</div>
      </div>

      {/*농부 정보 UI*/}
      <FarmerInfo farmer={{farmerId,farmerImg,farmerName}}/>
    </div>
  );
}

