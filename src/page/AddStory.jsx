import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { BiImageAdd } from "react-icons/bi";
import useUserInfo from '../hook/useUserInfo';
import Carousel from '../ui/Carousel';
import ArrayOrderChange from '../component/ArrayOrderChange';
import { cloudinaryUpload } from '../api/cloudinary';
import { updateServerStory, updateUserInfo, updateUserStory } from '../api/firebase';

export default function AddStory() {
  const navigate = useNavigate();
  const {userProfile} = useUserInfo();
  const userData = userProfile.data;

  const [storyImg, setStoryImg] = useState([]);
  const [text, setText] = useState('');
  const [changeOrder, setChangeOrder] = useState(false);
  const [isAble, setIsAble] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  let lastNum = storyImg.length;


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
    setIsAble(e.target.value.length<=300);
  }

  const handleChangeOrder = ()=>{
    setChangeOrder(true);
  }

  const handleCancelOrder = ()=>{
    setChangeOrder(false);
  }

  const handleChangeToResultArr = (arr)=>{
    setStoryImg(arr);
  }

  const handleStorySubmit = async ()=>{
    if (!isAble){
      alert("글자수 제한을 넘겼습니다.");
      return;
    } else if (storyImg.length===0){
      alert("이미지를 등록해주세요.");
      return;
    }

    setIsUploading(true);
    let userStoryImgList = [];

    for (let img of storyImg){
      await cloudinaryUpload(img).then(url => userStoryImgList.push(url));
    }

    let imgFirst = userStoryImgList[0];
    
    const storyId = uuidv4();
    const ServerStory = {
      id: storyId,
      imgList : userStoryImgList,
      contents: text,
    }

    const UserStory = {
      storyId,
      imageList : userStoryImgList,
      contents : text,
      first : imgFirst 
    }
    console.log(userStoryImgList);

    if (userStoryImgList.length>0 && userData){
      updateUserStory(userData, UserStory, storyId)
      .then(()=>{
        updateServerStory(ServerStory, userData, storyId)
        .then(()=>alert("스토리 등록을 완료했습니다."))
        .catch((error)=>{
          console.log(error);
          alert("서버 스토리 등록 실패")
        })
      })
      .catch((error)=>{
        alert("유저 스토리 등록 실패")
        console.log(error);
      })
      .finally(()=>{
        setIsUploading(false)
        setStoryImg([]);
        setText('');
      });
    }

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
        <div className='text-xs md:text-lg'>{isUploading ? '스토리 등록 중...' :'스토리 추가하기'}</div>
        <FaCheck className='text-lg md:text-2xl hover:cursor-pointer hover:text-brand'
          onClick={handleStorySubmit}
        />
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
      <div className='text-left w-full mt-4 mb-2 text-base'
        style={!isAble ? {'color':'tomato'}:{'color':'black'}}
      >스토리에 추가할 메시지를 작성해주세요.{`(${text.length}/300)`}</div>
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
      {changeOrder && <ArrayOrderChange imageList={storyImg} 
      onComplete={handleChangeToResultArr}
      onCancel={handleCancelOrder}
        
      />}
    </div>
  );
}

