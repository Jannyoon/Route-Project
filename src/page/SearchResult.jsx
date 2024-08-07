import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProductsContext } from '../context/useProductsContext';
import PaginatedItems from '../component/paginate/PaginatedItems';

export default function SearchResult() {
  const {snap, dataTrie} = useProductsContext();
  const textResult = useLocation().state;

  //const topResult = useMemo(()=>dataTrie.search(textResult), [textResult]);
  const topResult = dataTrie.search(textResult)||[];


  if (!textResult || textResult==='blank' || textResult==='') return (
  <div className='w-full py-3'>
    <div className='text-3xl mt-6'>검색 결과가 없습니다.</div>
  </div>
  )
  return (
    <div className='w-full h-svh bg-yellow-50 flex flex-col items-center p-2 gap-2'>
      <div className='w-full text-2xl md:text-3xl my-3'><span className='text-brand'>{textResult ||`""`}</span>의 검색 결과</div>
      {topResult && topResult.length>0 && 
      <div className='flex-shrink-0 w-full basis-1/2 bg-blue-100'>
        <div className='w-full basis-1/4 mb-2'>추천 검색 결과</div>
        <PaginatedItems itemsPerPage={4} items={topResult}/>
      </div>}
      <div className='flex-shrink-0 w-full basis-1/2 bg-gray-300'>
          dd
      </div>
    </div>
  );
}

