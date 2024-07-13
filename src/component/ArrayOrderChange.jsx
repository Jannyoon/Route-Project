import React, { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function ArrayOrderChange({imageList, onCancel}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const imgList = [...imageList];
  const prame = useRef();
  console.log("이미지 리스트", imgList);



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

          //기존의 테두리 색은 검정으로 다시 되돌려준다.
          const prev = prame.current.childNodes[currentIdx];
          prev.style['backgroundColor']='black';
          setCurrentIdx(idx);
        }
      }
    }
    document.addEventListener("click",handleClick)

    if (prame.current){
      const target = prame.current.childNodes[currentIdx];
      target.style["backgroundColor"]="#10B981";
    }

    return ()=>{document.removeEventListener("click", handleClick)}
  }, [currentIdx]);




  return (
    <div className='absolute w-full h-screen bg-black/75 flex flex-col items-center'>
      <div className='w-10/12 h-full bg-black text-white overflow-auto'>{/*실질적인 내부*/}
        <div className='w-full px-5 py-3 flex justify-between'>
          <div 
          className='hover:text-fcs hover:cursor-pointer'
          onClick={onCancel}>취소</div>
          <div>사진 순서 수정하기</div>
          <div>적용</div>
        </div>{/*윗 테두리 */}
        <div className='flex flex-col w-full h-full items-center'>
          {/*preview */}
          <img src={URL.createObjectURL(imageList[currentIdx])}
            className='w-10/12 h-1/3 md:w-1/3 md:h-4/12 lg:w-1/4 '
          />
          <div className='flex items-center text-3xl my-3'>
            <div className='text-white'><FaArrowAltCircleLeft /></div>
            <div className='mx-2'><MdDelete /></div>
            <div className='text-white'><FaArrowAltCircleRight /></div>
          </div>
          <div className='orderWrap grid grid-flow-row grid-cols-3'
            ref={prame}
          >
            {imgList.map((value, idx)=>(
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

