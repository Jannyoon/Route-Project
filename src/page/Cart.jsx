import React from 'react';
import { useAuthContext } from '../context/useAuthContext';
import useCart from '../hook/useCart';
import CartProduct from '../ui/CartProduct';
import calcTotal from '../hook/calcTotal';
export default function Cart() {
  const {user} = useAuthContext();
  const {userCart} = useCart();

  let realdata = userCart.data && Object.values(userCart.data);
  console.log("비어있을 때 출력", realdata);
  const cartCard = realdata && realdata.map((productId)=>Object.values(productId)).flat();
  const totalPrice = calcTotal(cartCard);



  console.log(cartCard);
  if (!user) return <div>로그인 후 이용해주세요</div>
  if (cartCard && cartCard.length===0) return <div className='w-full h-svh flex flex-col justify-center items-center bg-slate-50'>등록된 장바구니 상품이 없습니다.</div>
  return (
    <div className='w-full h-svh flex flex-col items-center'>
      <h1 className='w-full px-2 my-2 md:mt-7 text-2xl md:text-3xl font-bold text-brand border-b-2 pb-2 mb-1'>장바구니</h1>
      <div className='w-11/12 h-1/2 bg-slate-50 flex flex-col items-center overflow-y-auto'>
        {cartCard && cartCard.map((product, idx)=><CartProduct key={idx} product={product}/>)}
      </div>
      <div className='mt-6 md:mt-8 w-full md:w-11/12 flex justify-center items-center border-2 border-brand rounded-md'>
        <div className='basis-1/3 bg-brand text-center py-2'>
          <div className='text-xl'>Total</div>
          <div className='text-xs'>배송비 3000원 포함</div>
        </div>
        <div className='basis-2/3 text-xl text-center'>{totalPrice+3000} ₩</div>
      </div>
      <div className='w-full md:w-11/12 p-4 text-center bg-brand text-xl mt-2 rounded-md hover:text-white hover:bg-fcs cursor-pointer'>주문 하기</div>
    </div>
  );
}

