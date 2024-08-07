import React from 'react';
import { useLocation } from 'react-router-dom';
import { useProductsContext } from '../context/useProductsContext';

export default function SearchResult() {
  const {snap, dataTrie} = useProductsContext();
  const textResult = useLocation().state;

  if (!textResult || textResult==='blank' || textResult==='') return (
  <div className='w-full py-3'>
    <div className='text-3xl mt-6'>검색 결과가 없습니다.</div>
  </div>
  )
  return (
    <div className='w-full h-svh bg-yellow-50 flex flex-col items-center p-2'>
      <div className='w-full text-2xl md:text-3xl my-3'><span className='text-brand'>{textResult}</span>의 검색 결과</div>
      <div className='flex-shrink-0 w-full basis-1/2 bg-blue-100'>
        dd

      </div>
      <div className='flex-shrink-0 w-full basis-1/2 bg-gray-50'>
          dd
      </div>
    </div>
  );
}

