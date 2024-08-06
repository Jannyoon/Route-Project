import React, { createContext, useContext, Children, useEffect, useState, useMemo, useCallback } from 'react';
import { getAllList, snapshotListener } from '../api/getfireStore';
import searchTrie from '../hook/trieMaking';

const productsContext = createContext({Children})

export default function ProductsContextProvider({children}){
  //다양한 사용자가 상품을 등록할 때마다 data가 fetch되도록 하면, 
  //대규모 데이터일 때는 동작 시간이 너무 오래 걸릴 것.
  //일정 시간마다 새로운 데이터를 갱신하는 방식으로 하겠다.
  const [recentData, setRecentData] = useState([]);
  const dataFetch = useCallback(()=>{
    getAllList().then((result)=>setRecentData(result));
  },[]);

  //일정시간마다 데이터가 fetch 되도록 만들 것.
  useEffect(()=>{
    if (recentData.length===0) dataFetch();
    let time;
    time = setTimeout(()=>{
      dataFetch();
    },250000);
    return ()=>{time=undefined;}
  });

  const dataTrie = useMemo(()=>{
    return searchTrie(recentData)
  }, [recentData]);


  return (
    <productsContext.Provider value={{snap:recentData, dataTrie}}>
      {children}
    </productsContext.Provider>
  )
}

export function useProductsContext() {
  return useContext(productsContext)
}

