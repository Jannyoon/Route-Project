import React, { useEffect, useState, useMemo, useCallback } from 'react';
import useServerProducts from '../hook/useServerProducts';
import { getAllList } from '../api/getfireStore';
import { useProductsContext } from '../context/useProductsContext';

export default function SearchBar() {
  const {snap, dataTrie} = useProductsContext();
  const [serverProducts, setServerProducts] = useState();
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userSearchList, setUserSearchList] = useState([]);

  const handleChange = (e)=>{
    setText(e.target.value);
  }

  const handleFocusIn = ()=>{
    setIsTyping(true);
  }

  const handleFocusOut = ()=>{
    setIsTyping(false);
  }

  useEffect(()=>{
    let searchList = dataTrie.search(text);
    if (!searchList) setIsTyping(false);
    else if (!isTyping && text!=='' && searchList) setIsTyping(true);
    setUserSearchList(searchList || []);
  },[text])

  //test용
  useEffect(()=>{
    console.log("스냅 출력", snap);
    console.log(dataTrie);
  }, [snap])

  console.log(text!=='' && dataTrie.search(text));
  return (
    <form className='relative w-20 h-6 mr-1 md:w-60'>
      <input 
        className='w-20 h-6 mr-1 md:w-60 bg-transparent border-b-2 border-brand focus:outline-none focus:border-fcs p-2' placeholder='검색' 
        onChange={handleChange}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        value={text}/>

      {isTyping && (<div className='absolute top-7 w-36 h-48 md:w-60 z-10 p-1 border bg-white flex flex-col justify-center items-center'>
        <div className='w-full text-sm border-b pb-1 mb-1'>자동 완성 결과</div>
        <div className='w-full h-full flex flex-col bg-slate-200 overflow-y-auto'>
          {text==='' && '검색 결과가 없습니다'}
        </div>
      </div>)}
  </form>
  );
}

