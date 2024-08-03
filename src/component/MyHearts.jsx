import React from 'react';
import { useAuthContext } from '../context/useAuthContext';
import useProductFavorite from '../hook/useProductFavorite';
import HeartProduct from '../ui/HeartProduct';

export default function MyHearts() {
  //정보가 없을 경우 지정된 크기의 컴포넌트를 return. 리팩토링 필요.
  const {user} = useAuthContext();
  const {userFavoriteProduct} = useProductFavorite();

  console.log("결과", userFavoriteProduct.data);
  if (!userFavoriteProduct.data || userFavoriteProduct.data[0]===null){
    return (
      <div className='w-full h-96 flex flex-col justify-center items-center my-3'>
        <div className='w-10/12 h-full md:w-9/12 flex flex-col justify-center items-center bg-yellow-50 overflow-y-auto'>
          등록된 상품이 없습니다.
        </div>
      </div>
    )
  }

  let productList = userFavoriteProduct.data && Object.values(userFavoriteProduct.data);

  return (
    <div className='w-full h-96 flex flex-col justify-center items-center my-3'>
      <div className='w-10/12 h-full md:w-9/12 flex flex-col items-center bg-yellow-50 overflow-y-auto'>
        {productList.map((product)=><HeartProduct product={product}/>)}
      </div>
    </div>
  );
}

