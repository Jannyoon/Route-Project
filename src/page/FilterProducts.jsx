import React, { useCallback, useEffect } from 'react';
import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useProductsContext } from '../context/useProductsContext';
import productListData from '../hook/productListData';
import PaginatedItems from '../component/paginate/PaginatedItems';

export default function FilterProducts() {
  const {typeList} = productListData();
  const {snap} = useProductsContext();
  const vh = useMemo(()=>window.innerHeight/100, []);
  const firstKind = useLocation().state;

  const filterProductsList = useCallback((all, type, kind)=>{
    console.log("전체 목록", all);
    let result = all.filter(product => product[kind]===type);
    return result;
  },[snap])

  //firstKind에 해당하는 전체 상품을 불러온다.
  const firstKindProductsList = useMemo(()=>filterProductsList(snap, firstKind, "firstKind"), [snap]);
  const menuList = typeList(firstKind).map((v,idx)=>{
    if (idx===0) return "전체 상품";
    return v;
  });

  const [selected, setSelected] = useState("all"); //메뉴판에서 유저가 세부 secondKind를 선택하는 칸
  const [secondList, setSecondList] = useState(firstKindProductsList);

  const handleKindClick = (e)=>{
    setSelected(e.target.innerText);
  }

  
  useEffect(()=>{
    if (selected==='전체 상품' || selected==="all") setSecondList(firstKindProductsList);
    else {
      const secondResult = filterProductsList(firstKindProductsList, selected, "secondKind");
      setSecondList(secondResult); 
    }
  },[selected])


  console.log("selected", selected);
  console.log("secondList", secondList);
  return (
    <div className='w-full flex mt-2'
      style={{'height':`${90*vh}px`}}
    >
      <div className='flex-shrink-0 basis-1/4 md:basis-1/6 h-full overflow-y-auto'>
        {menuList && menuList.map(secondKind=>(
          <div className='w-full overflow-hidden whitespace-nowrap text-ellipsis p-1 hover:bg-gray-100 cursor-pointer'
            onClick={handleKindClick}
          >{secondKind}</div>))}
      </div>
      <div className='flex-grow h-full flex flex-col overflow-y-auto gap-1 pl-4'>
        {/*secondList && secondList.map(product => <div className='flex-shrink-0'>{product.title}</div>)*/}
        {secondList.length>0 && <div className='w-full h-full flex-shrink'><PaginatedItems itemsPerPage={8} items={secondList}/></div>}
        {(selected==="전체 상품" || selected==="all") && secondList.length===0 && <div>메뉴를 선택하세요</div>}
        {selected!=="전체 상품" && selected!=="all" && secondList.length===0 && <div>검색 결과가 없습니다.</div>}
      </div>
  
    </div>
  );
}

