import React, { useState, useRef, useEffect } from 'react';
import StoryImgItem from '../ui/StoryImgItem';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import IdxBtn from '../ui/IdxBtn';

export default function StoryCarousel({storyImgs}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [startX, setStartX] = useState();
  const [isDrag, setIsDrag] = useState(false);

  const container = useRef();
  let TotalLen = storyImgs.length; //전체 이미지 길이
  let lastIdx = storyImgs.length-1;
  let IdxArr = Array.from({length:TotalLen},()=>'');

  let SLIDEWIDTH = container.current && container.current.offsetWidth;
  let SLIDEHEIGHT = container.current && container.current.offsetHeight;

  const [swidth, setSwidth] = useState();
  const [sHeight, setSHeight] = useState();
  useEffect(()=>{
    console.log(container.current);

    SLIDEWIDTH = container.current.offsetWidth;
    SLIDEHEIGHT = container.current.offsetHeight;
    setSwidth(prev => SLIDEWIDTH);
    setSHeight(prev => SLIDEHEIGHT);
  
  }, [swidth, sHeight]);

  console.log(SLIDEWIDTH);
  console.log("현재 인덱스", currentIdx);

  const handleDragClick = (e)=>{
    e.preventDefault();
    setStartX(e.pageX);
    setIsDrag(true);
  }

  const handleDragEnd = (e)=>{
    e.preventDefault();
    if (!isDrag) return;
    const delta = startX-e.pageX;
 
    if (delta===0) return; //클릭했다는 것
    else if (delta>0){ //currentIdx+1
      if (currentIdx===lastIdx) return;
      setCurrentIdx(prev => prev+1);
    }
    else {
      if (currentIdx===0) return;
      setCurrentIdx(prev => prev-1);
    }
    setIsDrag(false);
  }

  const handleLeftClick = ()=>{
    if (currentIdx===0) return;
    setCurrentIdx(prev => prev-1);
  }

  const handleRightClick = ()=>{
    if (currentIdx===lastIdx) return;
    setCurrentIdx(prev => prev+1);
  }

  return (
    <div 
      ref={container}
      className='relative w-full h-4/6 md:w-full md:h-1/2 lg:w-8/12 lg:h-5/6 bg-teal-300 overflow-hidden'>
      {/*실제 움직이는 영역*/}
      <div className='flex' 
        onMouseDown={handleDragClick}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        style={{
          'transform': `translateX(${-currentIdx*SLIDEWIDTH}px)`,
          'transition' : 'transform 200ms ease'
        }}
      >   
      {storyImgs.map(url => (
        <StoryImgItem src={url} width={SLIDEWIDTH} height={SLIDEHEIGHT}/>
      ))}
      </div>
      <div className='absolute left-0.5 text-slate-900 text-5xl'
        style={{
          'top':`${(SLIDEHEIGHT/2)-24}px`,
          'display': lastIdx===0 ? 'none' : 'block',
          'cursor': currentIdx===0 ? 'default' : 'pointer',
          'color' : currentIdx===0 ? 'rgb(15 23 42 / 1)': 'rgb(71 85 105 / 1)' 
        }}
        onClick={handleLeftClick}
      ><IoIosArrowDropleftCircle /></div>
      <div className='absolute right-0.5 text-5xl hover:cursor-pointer'
        style={{
          'top':`${(SLIDEHEIGHT/2)-24}px`,
          'display': lastIdx===0 ? 'none' : 'block', 
          'cursor': currentIdx===lastIdx ? 'default' : 'pointer',
          'color' : currentIdx===lastIdx ? 'rgb(15 23 42 / 1)': 'rgb(71 85 105 / 1)'
        }}
        onClick={handleRightClick}
      ><IoIosArrowDroprightCircle /></div>
      {lastIdx>0 && <IdxBtn arr={IdxArr} currentIdx={currentIdx} containerWidth={SLIDEWIDTH}/>}
    </div>
  );
}

