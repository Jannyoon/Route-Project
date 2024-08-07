import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import useServerProducts from '../hook/useServerProducts';
import { getAllList } from '../api/getfireStore';
import { useProductsContext } from '../context/useProductsContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const {snap, dataTrie} = useProductsContext();
  const inputRef = useRef();
  const searchContainer = useRef();
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userSearchList, setUserSearchList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setText(e.target.value);
  }

  const handleFocusIn = ()=>{
    setIsTyping(true);
  }

  const handleResultClick = (result)=>{
    const [productId, data] = [result[1], result[2]];
    navigate(`/product/${productId}`, {state: data});
    setIsTyping(false);
    setText('');
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/search/${text||`blank`}`, {state:text||'blank'});
    setIsTyping(false);
  }

  useEffect(()=>{
    let searchList = dataTrie.search(text);
    if (searchList.length>10) searchList = searchList.slice(0,11);

    if (!searchList) setIsTyping(false);
    else if (!isTyping && text!=='' && searchList) setIsTyping(true);
    setUserSearchList(searchList || []);
  },[text])

  useEffect(()=>{
    if (!searchContainer.current || !inputRef.current) return;
    const handleClick = (e)=>{
      e.stopPropagation();
      if (searchContainer.current && (inputRef.current.contains(e.target) || searchContainer.current.contains(e.target))) setIsTyping(true);
      else if (searchContainer.current && !searchContainer.current.contains(e.target)) setIsTyping(false);
    }
    document.addEventListener("click", handleClick);
    return ()=>document.removeEventListener("click", handleClick);
  }, [isTyping]);


  //console.log(text!=='' && dataTrie.search(text));
  return (
    <form className='relative w-20 h-6 mr-1 md:w-60' onSubmit={handleSubmit}>
      <input 
        ref={inputRef}
        className='w-20 h-6 mr-1 md:w-60 bg-transparent border-b-2 border-brand focus:outline-none focus:border-fcs p-2' placeholder='검색' 
        onChange={handleChange}
        onFocus={handleFocusIn}
        value={text}/>

      {isTyping && (<div ref={searchContainer} className='absolute top-7 w-36 h-48 md:w-60 z-10 py-1 border bg-white flex flex-col justify-center items-center'>
        <div className='w-full text-sm border-b pb-1 mb-1 px-1'>자동 완성 결과</div>
        <div 
        className='w-full h-full flex flex-col bg-slate-50 overflow-y-auto'>
          {text==='' && <div className='p-1'>검색 결과가 없습니다</div>}
          {text!=='' && userSearchList.length>0 && 
            userSearchList.map(result => 
            <div className='flex-shrink-0 w-full whitespace-nowrap overflow-hidden text-ellipsis p-1 
            cursor-pointer hover:bg-slate-200'
              onClick={()=>{handleResultClick(result)}}
            >
              {result[0]}
            </div>)}
        </div>
      </div>)}
  </form>
  );
}

