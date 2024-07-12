import React, { useEffect, useRef, useState } from 'react';
import { BiImageAdd } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

export default function Carousel({imageList, onImgAdd, onImgUpdate, onOrderChange}) {
  const len = imageList.length;
  const carousel = useRef();
  const deleteButton = useRef();
  const addImgInput = useRef();

  const imgList = [...imageList];

  const handleDeleteImg = (e)=>{
    e.stopPropagation();
    let idx = e.target.getAttribute("id");
    const arr = imgList.filter((v,i)=>v!==imgList[idx]);
    onImgUpdate(arr);
  }

  return (
    <div className=' h-full flex items-center'
      ref={carousel}
    >
      {imgList.map((v,idx)=>(
        <div key={idx} id={idx} className='relative'
        style={{
          'width':'43vh',
          'height':'43vh',
        }}
        onClick={(e)=>{
          if (deleteButton.current){
            console.log(deleteButton.current.contains(e.target));
            if (!deleteButton.current.contains(e.target)) onOrderChange();
          }
        }}
        >
          <img 
          key={idx}
          src={URL.createObjectURL(v)}
          id={idx}
          style={{
            'width':'43vh',
            'height':'43vh',
          }}
          />
          <div className='absolute top-2 right-2 w-8 h-8 bg-slate-50 rounded-full 
            flex justify-center items-center
            text-3xl hover:cursor-pointer hover:bg-brand'
            ref={deleteButton}
            id={idx}
            onClick={handleDeleteImg}
            >
            <TiDeleteOutline  id={idx}/>
          </div>
        </div>
      ))}
      {len<5 &&    
      (<>
        <label htmlFor='imgAdd'>
          <div className='text-5xl flex items-center justify-center bg-slate-100 hover:bg-slate-300
          hover:cursor-pointer'
            style={{
              'width':'30vh',
              'height':'43vh',
            }}
            ref={addImgInput}
          >
            <BiImageAdd />
          </div>
        </label>
        <input type='file' id='imgAdd'
          onChange={onImgAdd}
          style={{'display':'none'}}
        />
      </>)}
    </div>
  )
}

