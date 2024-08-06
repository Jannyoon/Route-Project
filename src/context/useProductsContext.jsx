import React, { createContext, useContext, Children, useEffect, useState, useMemo } from 'react';
import { snapshotListener } from '../api/getfireStore';

const productsContext = createContext({Children})

export default function ProductsContextProvider({children}){
  const [recentSnap, setRecentSnap] = useState();
  useEffect(()=>{
    snapshotListener((newSnap)=>setRecentSnap(newSnap));
  },[])

  return (
    <productsContext.Provider value={{snap:recentSnap}}>
      {children}
    </productsContext.Provider>
  )
}

export function useProductsContext() {
  return useContext(productsContext)
}

