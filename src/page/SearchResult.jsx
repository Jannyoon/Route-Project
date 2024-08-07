import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProductsContext } from '../context/useProductsContext';
import PaginatedItems from '../component/paginate/PaginatedItems';
import getRelatedResults from '../hook/getRelatedResults';

export default function SearchResult() {
  const {snap, dataTrie} = useProductsContext();
  const textResult = useLocation().state;

  //const topResult = useMemo(()=>dataTrie.search(textResult), [textResult]);
  const topResult = dataTrie.search(textResult)||[];
  const relatedResult = getRelatedResults(textResult, snap);


  if (!textResult || textResult==='blank' || textResult==='') return (
  <div className='w-full py-3'>
    <div className='text-3xl mt-6'>검색 결과가 없습니다.</div>
  </div>
  )
  return (
    <div className='w-full h-svh flex flex-col items-center p-2 gap-2'>
      <div className='w-full text-2xl md:text-3xl my-3'><span className='text-brand'>{textResult ||`""`}</span>의 검색 결과</div>
      {/*추천 검색 결과*/}
      {topResult && topResult.length>0 && 
      <div className=' w-full h-full border-b-2 pb-3 mb-3'>
        <div className='w-full basis-1/4 text-xl mb-4'>추천 검색 결과</div>
        <PaginatedItems itemsPerPage={4} items={topResult}/>
      </div>}
      {/*연관 검색 결과*/}
      <div className=' w-full h-full '>
        <div className='w-full basis-1/4 text-xl mb-4'>연관 검색 결과</div>
        {relatedResult.length>0 ?
          <PaginatedItems itemsPerPage={4} items={relatedResult}/>
          :<div>검색 결과가 없습니다.</div>}
      </div>
    </div>
  );
}

