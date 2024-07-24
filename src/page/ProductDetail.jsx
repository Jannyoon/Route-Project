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
import { IsProduct, updateUserCart } from '../api/firebase';
import useCart from '../hook/useCart';
import { useQueryClient } from '@tanstack/react-query';

export default function ProductDetail() {
  const {user} = useAuthContext();
  const [viewDetail, setViewDetail] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const product = useLocation().state;
  const queryClient = useQueryClient();
  
  const {buy, 
    farmerId, 
    farmerImg, 
    farmerName, 
    favorite, 
    firstKind, 
    imgList,
    imgFirst, 
    keyword, 
    option, 
    productDetail, 
    productId,
    secondKind, 
    title} = product;

  //const titlePrice = option ? option.split(",")[0].split(":") : 0;

  const optionPrice = option ? option.split(",").map((v)=>v.trim().split(":")): [""];
  //console.log("옵션별로..", optionPrice);
  const [nowOption, setNowOption] = useState(optionPrice[0]); //["optionname", "${priceNum}"]
  //초기 설정 문제로 1번 idx가 없을 수 있다.
  //1번 idx가 없을 경우 3000원을 기본값으로 설정하겠다.
  const  {addProductToCart} = useCart(productId, nowOption[0]);

  useEffect(()=>{
    console.log("현재 옵션", nowOption);
  }, [nowOption]);
  

  const handleViewClick = ()=>setViewDetail(prev => !prev);
  if (!product){
    return (<div>subProduct 출력</div>);
  }

  const handleOptionChange = (e)=>{
    setNowOption(e.target.value.split(":"));
  }

  const handleChangeCount = (e)=>{
    setCount(e.target.value);
  }

  const handleAddCart = ()=>{
    if (!count){
      alert("상품 갯수를 입력해주세요.");
      return;
    }

    const sendProduct = {
      userId:user.uid,
      productId, 
      title, 
      count: parseInt(count), 
      productOption:nowOption, 
      total:(nowOption[1]??3000)*count,
    }

    addProductToCart.mutate({productId, optionName:nowOption[0]},{
      onSuccess: async (result)=>{
        console.log("최종 결과", result);
        await updateUserCart(user.uid, productId, nowOption[0],
          !result ? sendProduct : {...sendProduct,
            count: Number(sendProduct.count)+Number(result.count)
          })
        .then(()=>{
          alert("장바구니에 추가되었습니다.");
        })
        .catch(()=>{
          alert("비정상적인 접근입니다.");
        })
        .finally(()=>{
          setCount(0);
          setNowOption(optionPrice[0]);
        });

        queryClient.invalidateQueries({queryKey:['Carts', user.uid||"", productId||"", nowOption[0]||""]});
      },
      onerror:(error)=>console.log(error)    
    })
  }


 
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
          <div className='shrink-0'>{optionPrice[0][1]??3000} ₩</div>
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
              <select onChange={handleOptionChange}>
                {option && option.split(",").map((v)=><option>{v.trim()}</option>)}
              </select>
            </div>
            <div className='flex items-center gap-2'>
              <div>개수</div>
              <input 
                onChange={handleChangeCount} 
                className="p-2 text-center" min={1} max={10} type='number' placeholder={0}
                value={count}
                />
            </div>
          </div>
        </div>
        <div className='w-full text-end text-3xl text-brand p-2 font-semibold'>{(nowOption[1]??3000)*count} ₩</div>
      </div>
      
      {user && (<div className='w-9/12 flex justify-center'>
        <div className='w-full h-full p-4 text-center font-semibold border-2 border-brand cursor-pointer hover:bg-brand'
          onClick={user &&handleAddCart}
        >장바구니</div>
        <div className='w-full h-full p-4 text-center font-semibold border-2 border-brand cursor-pointer hover:bg-brand'>바로구매</div>
      </div>)}

      {/*농부 정보 UI*/}
      <FarmerInfo farmer={{farmerId,farmerImg,farmerName}}/>
    </div>
  );
}

