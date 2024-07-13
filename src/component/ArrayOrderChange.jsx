import React, { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

export default function ArrayOrderChange({imageList, onCancel, onComplete}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const imgList = [...imageList];
  const arr = imageList && imageList.map(v => v);
  const [orderImg, setOrderImg] = useState(arr);

  console.log("기존의 이미지리스트", imgList);
  console.log("현재", orderImg);
  const prame = useRef();


  let len = orderImg.length;

  useEffect(()=>{
    const handleClick = (e)=>{
      const target = e.target;
      const img = target.parentElement;
      let targetList;

      if (prame.current && prame.current.contains(target)){
        targetList = [...prame.current.childNodes];
        if (targetList.includes(target) || targetList.includes(img)){
          let idx = -1;
          idx = targetList.indexOf(target);
          if (idx===-1) idx = targetList.indexOf(img);
          setCurrentIdx(idx);
        }
      }
    }

    document.addEventListener("click",handleClick);

    if (prame.current){
      const target = prame.current.childNodes[currentIdx];
      target.style["backgroundColor"]="#10B981";
      for (let node of prame.current.childNodes){
        if (node!==target)
          node.style['backgroundColor']='black';
      }
    }

    return ()=>{document.removeEventListener("click", handleClick)}
  }, [currentIdx]);


  const handlePrev = ()=>{
    let arr = orderImg.map(v => v);
    if (currentIdx===0) return;
    [arr[currentIdx-1], arr[currentIdx]] = [arr[currentIdx], arr[currentIdx-1]];

    setOrderImg(prev => arr);
    setCurrentIdx((prev) => prev-1);
  }

  const handleNext = ()=>{
    let arr = orderImg.map(v => v);
    if (currentIdx===len-1) return;
    [arr[currentIdx], arr[currentIdx+1]] = [arr[currentIdx+1], arr[currentIdx]];

    setOrderImg(prev => arr);
    setCurrentIdx(prev => prev+1);
  }

  const handleDelete = ()=>{
    if (orderImg.length===1) return;
    let arr = orderImg.filter((v,i)=>i!==currentIdx);   
    if (currentIdx===orderImg.length-1) setCurrentIdx(prev => prev-1);
    setOrderImg(prev => arr);
  }

  const handleComplete = ()=>{
    onComplete(orderImg);
    onCancel();
    console.log("적용 완료");
  }

  return (
    <div className='absolute w-full h-screen bg-black/75 flex flex-col items-center'>
      <div className='w-10/12 h-full bg-black text-white overflow-auto'>{/*실질적인 내부*/}
        <div className='w-full px-5 py-3 flex justify-between'>
          <div 
          className='hover:text-fcs hover:cursor-pointer'
          onClick={onCancel}>취소</div>
          <div>사진 순서 수정하기</div>
          <div 
          className='hover:text-fcs hover:cursor-pointer'
          onClick={handleComplete}>적용</div>
        </div>{/*윗 테두리 */}
        <div className='flex flex-col w-full h-full items-center'>
          {/*preview */}
          <img src={URL.createObjectURL(orderImg[currentIdx])}
            className='w-10/12 h-1/3 md:w-1/3 md:h-4/12 lg:w-1/4 '
          />
          <div className='flex items-center text-3xl my-3'>
            <div className='text-white cursor-pointer hover:text-fcs' onClick={handlePrev}
             style={orderImg.length===1 ? {
              'cursor':'default',
              'color':'gray'
              }:{}}            
            ><FaArrowAltCircleLeft /></div>
            <div className='mx-2 cursor-pointer hover:text-fcs' onClick={handleDelete}
             style={orderImg.length===1 ? {
              'cursor':'default',
              'color':'gray'
              }:{}}
            ><MdDelete /></div>
            <div className='text-white cursor-pointer hover:text-fcs' onClick={handleNext}
              style={orderImg.length===1 ? {
              'cursor':'default',
              'color':'gray'
              }:{}}
            ><FaArrowAltCircleRight /></div>
          </div>
          <div className='orderWrap grid grid-flow-row grid-cols-3'
            ref={prame}
          >
            {orderImg.map((value, idx)=>(
              <div className='md:w-48 md:h-48 lg:w-56 lg:h-56 mx-2 mt-2 rounded-lg overflow-hidden p-1.5'
                key={idx}
                id={idx}
              >
                <img 
                  src={URL.createObjectURL(value)}
                  className='w-full h-full'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

