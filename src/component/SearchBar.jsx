import React, { useEffect, useState, useMemo, useCallback } from 'react';
import useServerProducts from '../hook/useServerProducts';
import { getAllList } from '../api/getfireStore';
import { useProductsContext } from '../context/useProductsContext';

export default function SearchBar() {
  const {snap, dataTrie} = useProductsContext();
  const [serverProducts, setServerProducts] = useState();
  const [text, setText] = useState('');
  const handleChange = (e)=>{
    setText(e.target.value);
  }


  useEffect(()=>{
    console.log("스냅 출력", snap);
    console.log(dataTrie);
  }, [snap])


  return (
    <form>
      <input 
        className='w-20 h-6 mr-1 md:w-60 bg-transparent border-b-2 border-brand focus:outline-none focus:border-fcs p-2' placeholder='검색' 
        onChange={handleChange}
        value={text}
      />
  </form>
  );
}

