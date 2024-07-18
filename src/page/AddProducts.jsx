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
import { addServerProduct, addUserProduct } from '../api/firebase';

export default function AddProducts() {
  const [storyImg, setStoryImg] = useState([]);
  const [product, setProduct] = useState({});
  const [kind, setKind] = useState("과일");
  const {fruitList, vegeList, etcList} = productListData();
  const [secondKind, setSecondKind] = useState("상품선택");
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const {userProfile} = useUserInfo();
  const userData = userProfile.data;
  

  useEffect(()=>{
    setProduct({...product, firstKind:kind, secondKind})
  }, [kind, secondKind])

  if (!userData) return(<div>로그인 후 이용해주세요</div>)
  if (!userData.isFarmer){
    alert("잘못된 접근입니다.");
    navigate('/me');
  }

 
  const {profile_picture, nickName, userId, isFarmer} = userData;

  let lastNum = storyImg.length;

  const handleAddImg = (e)=>{
    if (storyImg.length===5){
      alert("최대 5개까지만 등록이 가능합니다.");
      return;
    }
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

  const handleSubmit = async ()=>{
    if (storyImg.length===0){
      alert("상품 이미지를 1개 이상 등록해주세요.");
      return;
    }
    if (secondKind==='상품선택'){
      alert("상품 품목을 선택해주세요.");
      return;
    }
    if (!product.productDetail || product.productDetail.length<1){
      alert("상품 설명을 입력해주세요.");
      return;
    }
    if (!product.keyword || product.keyword.length<1){
      alert("키워드를 입력해주세요.");
      return;
    }
    if (!product.option || product.option<1){
      alert("옵션을 입력해주세요.");
      return;
    }

    setIsUploading(true);

    let imgUrlList = [];
    for (let img of storyImg){
      await cloudinaryUpload(img).then(url => imgUrlList.push(url));
    }

    console.log("클라우드 완료", imgUrlList);
    let imgUrlFirst = imgUrlList[0];
    let productId = uuidv4();
    let ServerProduct = {...product, 
      productId, 
      imgList:imgUrlList,
      imgFirst : imgUrlFirst,
      farmerId:userId, 
      farmerName:nickName,
      farmerImg:profile_picture,
      favorite:0,
      buy:0
    }

    let UserProduct = {...product, productId, imgList:imgUrlList, imgFirst:imgUrlFirst,};

    addServerProduct(ServerProduct, productId)
    .then(()=>{
      console.log("서버 상품 등록 성공");
      addUserProduct(UserProduct, userId, productId)
      .then(()=>{
        alert("상품 등록 성공");
        setProduct({});
        setStoryImg([]);
        setSecondKind("상품선택");
      })
      .catch((error)=>console.log(error))
    })
    .finally(()=>{
      setIsUploading(false)
      setKind("과일");
      setSecondKind("상품선택")
    });
  }

  return (
  <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between px-3 mt-6 pb-2 border-b'>
        <IoIosArrowBack 
          className='text-xl md:text-3xl hover:cursor-pointer hover:text-brand'
          onClick={()=>navigate('/me')}
        />
        <div className='text-xs md:text-lg'>{isUploading ? '상품 등록 중...': '상품 등록하기'}</div>
        <FaCheck className='text-lg md:text-2xl hover:cursor-pointer hover:text-brand'
          onClick={handleSubmit}
        />
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
          className="w-3/5 md:w-2/5 border py-1 px-1 focus:outline-fcs" type="text" name="title"
          value={product.title ?? ''}
          disabled={isUploading}
          />
        </div>
        <div className='w-full flex justify-center gap-2  mb-2'>
          <p>상품설명</p>
          <input 
          onChange={handleTextChange}
          value={product.productDetail ?? ''}
          className="w-3/5 md:w-2/5 border py-1 px-3 focus:outline-fcs" type="text" name="productDetail"
          disabled={isUploading}
          />
        </div>

       <div className='w-full flex justify-center gap-2  mb-2'>
          <p>옵션:가격(₩ 제외)</p>
          <input 
          onChange={handleTextChange}
          value={product.option ?? ''}
          placeholder=',로 구분(ex: S:10000, M:30000, 3kg:15000)'
          className="w-3/5 md:w-2/5 border py-1 px-3 focus:outline-fcs" type="text" name="option"
          disabled={isUploading}
          />
        </div>
        <div className='w-full flex justify-center gap-2  mb-2'>
          <p>키워드</p>
          <input 
          placeholder=',로 구분(1개 이상 필수)'
          onChange={handleTextChange}
          value={product.keyword??''}
          className="w-3/5 md:w-2/5 border py-1 px-3 focus:outline-fcs" type="text" name="keyword"
          disabled={isUploading}
          />
        </div>
        <div className='w-full flex justify-center gap-2  mb-2'>
          <p className='flex-shrink-0'>종류1</p>
          <select className="mr-2" onChange={handleKindChange}
            value={kind}
            disabled={isUploading}
          >
            <option value={"과일"}>과일</option>
            <option value={"채소"}>채소</option>
            <option value={"기타"}>기타</option>
          </select>
          <p className="ml-2 flex-shrink-0">종류2</p>
          <select onChange={handleSecondKindChange}
            value={secondKind}
            disabled={isUploading}
          >{
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

