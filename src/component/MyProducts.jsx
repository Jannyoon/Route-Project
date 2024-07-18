import React from 'react';

export default function MyProducts() {
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

