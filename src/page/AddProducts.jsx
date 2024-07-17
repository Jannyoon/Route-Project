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
import productListData from './productListData';
import KeyWordsView from '../ui/KeyWordsView';

export default function AddProducts() {
  const [storyImg, setStoryImg] = useState([]);
  const [product, setProduct] = useState({});
  const [kind, setKind] = useState("과일");
  const {fruitList, vegeList, etcList} = productListData();
  const [secondKind, setSecondKind] = 
  useState(kind==="과일"? fruitList[0] :(kind==="채소"? vegeList[0] : etcList[0]));
  
  const firstRef = useRef();
  const SecondRef = useRef();

  const navigate = useNavigate();
  const {userProfile} = useUserInfo();
  const userData = userProfile.data;
  
  console.log("product", product);
  useEffect(()=>{
    setProduct({...product, ["imgList"]:storyImg, ["종류"]:kind, ['세부종류']:secondKind})
  }, [storyImg, kind, secondKind])

  if (!userData) return(<div>로그인 후 이용해주세요</div>)
  if (!userData.isFarmer){
    alert("잘못된 접근입니다.");
    navigate('/me');
  }

 
  const {profile_picture, nickName, userId, isFarmer} = userData;

  let lastNum = storyImg.length;
 
  console.log("종류1, 종류2", kind, secondKind);

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
  
  const handleKindChange = (e)=>{
    const value = e.target.value;
    setKind(value);
  }

  const handleSecondKindChange = (e)=>{
    const value = e.target.value;
    setSecondKind(value);
  }

  const handleTextChange = (e)=>{
    const {name, value} = e.target;
    setProduct({...product, [name]:value})
  }
  console.log("현재 저장된 이미지 리스트", storyImg);


  return (
  <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack 
          className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
          onClick={()=>navigate('/me')}
        />
        <div className='text-xs md:text-lg'>상품 등록하기</div>
        <FaCheck className='text-lg md:text-2xl hover:cursor-pointer hover:text-brand'/>
      </div>
      <div className='w-full lg:w-6/12 flex flex-col items-center p-2 bg-slate-100'
        style={lastNum===0 ? {'height':'46vh', 'justifyContent':'center'} : {'alignItems':'start','height':'46vh', 'overflow':'auto'}}
      >
      {lastNum===0 &&(
        <>
          <label htmlFor='storyImg'> 
            <div className='bg-slate-200 flex justify-center items-center'
            style={{
              'width':'43vh',
              'height':'43vh',
            }}
            >
              <div className='text-5xl'><BiImageAdd /></div>
            </div>
          </label>
          <input type='file' id='storyImg'
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
          />
        }
      </div>
      {product.keyword && product.keyword.length>0 && 
      <KeyWordsView str={product.keyword}/>}
      <div className='w-10/12 flex flex-col items-center'>
        <div className='w-full mt-5 flex justify-center gap-2 mb-2'>
          <p>상품명</p>
          <input 
          onChange={handleTextChange}
          className="w-3/5 md:w-2/5 border py-1 px-1 focus:outline-fcs" type="text" name="title"/>
        </div>
        <div className='w-full flex justify-center gap-2  mb-2'>
          <p>상품설명</p>
          <input 
          onChange={handleTextChange}
          value={product.productDetail ?? ''}
          className="w-3/5 md:w-2/5 border py-1 px-3 focus:outline-fcs" type="text" name="productDetail"/>
        </div>

       <div className='w-full flex justify-center gap-2  mb-2'>
          <p>옵션</p>
          <input 
          onChange={handleTextChange}
          value={product.option ?? ''}
          placeholder=',로 구분(ex: S, M, L, 3kg, 5kg)'
          className="w-3/5 md:w-2/5 border py-1 px-3 focus:outline-fcs" type="text" name="option"/>
        </div>
        <div className='w-full flex justify-center gap-2  mb-2'>
          <p>키워드</p>
          <input 
          onChange={handleTextChange}
          value={product.keyword}
          className="w-3/5 md:w-2/5 border py-1 px-3 focus:outline-fcs" type="text" name="keyword"/>
        </div>
        <div className='w-full flex justify-center gap-2  mb-2'>
          <p className='flex-shrink-0'>종류1</p>
          <select ref={firstRef} className="mr-2" onChange={handleKindChange}>
            <option value={"과일"}>과일</option>
            <option value={"채소"}>채소</option>
            <option value={"기타"}>기타</option>
          </select>
          <p className="ml-2 flex-shrink-0">종류2</p>
          <select ref={SecondRef} onChange={handleSecondKindChange}>{
            kind==='과일' ?
            fruitList.map((fruit)=><option value={fruit}>{fruit}</option>)

            :(kind==='채소'?
              vegeList.map((vege)=><option value={vege}>{vege}</option>)
              :
              etcList.map((etc)=><option value={etc}>{etc}</option>)
            )
            
            }
          </select>
        </div>
        
    </div>
    </div>
  );
}

