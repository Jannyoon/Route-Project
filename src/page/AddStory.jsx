import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { BiImageAdd } from "react-icons/bi";
import useUserInfo from '../hook/useUserInfo';
import Carousel from '../ui/Carousel';
import ArrayOrderChange from '../component/ArrayOrderChange';

export default function AddStory() {
  const navigate = useNavigate();
  const {userProfile} = useUserInfo();
  const userData = userProfile.data;

  const [storyImg, setStoryImg] = useState([]);
  const [text, setText] = useState('');
  const [changeOrder, setChangeOrder] = useState(false);

  let lastNum = storyImg.length;

  console.log("현재 Order,", changeOrder);
  const handleAddImg = (e)=>{
    if (storyImg.length===5){
      alert("최대 5개까지만 등록이 가능합니다.");
      return;
    }
    console.log(e.target.files);
    const files = e.target.files;
    files && setStoryImg([...storyImg, files[0]]);
  }

  const updateImgArr = (arr)=>{
    setStoryImg(arr);
  }

  const handleTextChange = (e)=>{
    setText(e.target.value);
  }

  const handleChangeOrder = ()=>{
    setChangeOrder(true);
  }

  const handleCancelOrder = ()=>{
    setChangeOrder(false);
  }

  useEffect(()=>{
    console.log("현재 img", storyImg);
  }, [storyImg])
  console.log("현재 유저 데이터", userData);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack 
          className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
          onClick={()=>navigate('/')}
        />
        <div className='text-xs md:text-lg'>스토리 추가하기</div>
        <FaCheck className='text-lg md:text-2xl hover:cursor-pointer hover:text-brand'/>
      </div>
      <div className='w-full lg:w-6/12 flex flex-col items-center p-2 bg-slate-100'
        style={lastNum===0 ? {'height':'46vh', 'justifyContent':'center'} : {'alignItems':'start','height':'46vh', 'overflow':'auto'}}
      >
      {lastNum===0 &&(
        <>
          <label htmlFor='imgChange'> 
            <div className='bg-slate-200 flex justify-center items-center'
            style={{
              'width':'43vh',
              'height':'43vh',
            }}
            >
              <div className='text-5xl'><BiImageAdd /></div>
            </div>
          </label>
          <input type='file' id='imgChange'
          onChange={handleAddImg}
          style={{'display':'none'}}
          />
        </>)} 
        {/*실제로 움직이는 캐러셀의 영역 */}
        {lastNum!==0 && 
         
          <Carousel 
            imageList={storyImg} 
            onImgAdd={handleAddImg} 
            onImgUpdate= {updateImgArr}
            onOrderChange ={handleChangeOrder}
          />
        }
      </div>
      <div className='text-right w-full mt-2 text-xs'>이미지를 탭하면 이미지의 순서를 바꿀 수 있습니다.</div>
      <div className='text-left w-full mt-4 mb-2 text-base'>스토리에 추가할 메시지를 작성해주세요.</div>
      <div className='w-full h-full'>
        <textarea
         className='w-full outline-brand border-brand border-2'
         style={{'height':'25vh',
          'overflowY':'scroll',
          'resize' : 'none'
         }}
         onChange={handleTextChange}
         value={text}
        />
      </div> 
      {changeOrder && <ArrayOrderChange imageList={storyImg} onCancel={handleCancelOrder}/>}
    </div>
  );
}

