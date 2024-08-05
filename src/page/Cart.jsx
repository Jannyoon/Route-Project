import React, { useMemo } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import useCart from '../hook/useCart';
import CartProduct from '../ui/CartProduct';

export default function Cart() {
  const {user} = useAuthContext();
  const {userCart} = useCart();

  const cartCard = useMemo(()=>{
    let data = userCart.data ?? {};
    let realdata = Object.values(data);
    let content = realdata.map((productId)=>Object.values(productId)).flat();
    return content;
  }, [userCart.data]);

  const totalPrice = useMemo(()=>{
    let total = 0;
    for (let i=0; i<cartCard.length; i++){
      total += parseInt(cartCard[i].total);
    }
    return total;
  }, [cartCard])


  if (!user) return <div>로그인 후 이용해주세요</div>
  if (cartCard.length===0) return <div>등록된 장바구니 상품이 없습니다.</div>
  return (
    <div className='w-full h-svh flex flex-col items-center'>
      <h1 className='w-full px-2 my-2 md:mt-7 text-2xl md:text-3xl font-bold text-brand border-b-2 pb-2 mb-1'>장바구니</h1>
      <div className='w-11/12 h-1/2 bg-slate-50 flex flex-col items-center overflow-y-auto'>
        {cartCard.map((product)=><CartProduct product={product}/>)}
      </div>
      <div className='mt-6 md:mt-8 w-full md:w-11/12 flex justify-center items-center border-2 border-brand rounded-md'>
        <div className='basis-1/3 bg-brand text-center py-2'>
          <div className='text-xl'>Total</div>
          <div className='text-xs'>배송비 3000원 포함</div>
        </div>
        <div className='basis-2/3 text-xl text-center'>{totalPrice} ₩</div>
      </div>
      <div className='w-full md:w-11/12 p-4 text-center bg-brand text-xl mt-2 rounded-md hover:text-white hover:bg-fcs cursor-pointer'>주문 하기</div>
    </div>
  );
}

