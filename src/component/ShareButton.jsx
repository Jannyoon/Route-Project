import React, {useEffect} from 'react';
import KakaoShare from '../api/KakaoShare';
const {Kakao} = window;

export default function ShareButton({product}) {
  const resultUrl = window.location.href;
  const {shareKakao} = KakaoShare(product);

  useEffect(()=>{
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    console.log(Kakao.isInitialized());
  })


  return (
    <div className='px-1 cursor-pointer rounded-md text-base bg-slate-200 hover:scale-105 border flex justify-center items-center'
      onClick={shareKakao}
    >
      <div>카카오톡 공유하기</div>
    </div>
  );
}

