import React, { useEffect, useState } from 'react';
import { AddNewUser, LogIn, checkPrevIDs, signUp } from '../api/firebase';
import { useNavigate, } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const [present, setPresent] = useState(true); //기존 회원 여부를 확인한다.
  const [idCheck, setIdCheck] = useState(false); //email만 입력했을 때 기존 회원 여부를 알아서 확인한다.
  const [isFarmer, setIsFarmer] = useState(false); //사업자인지 확인하는 용도

  useEffect(()=>{
    console.log("현재 farmer의 상태", isFarmer);
  }, [isFarmer])

  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handlePwChange = (e) => setUserPw(e.target.value);


  const handleAddClick = (e)=>{
    e.preventDefault();
    AddNewUser(userEmail, userPw, ()=>navigate('/'))
    .then(user =>{
      console.log("결과", user);
      user && signUp(user.uid, user.email, isFarmer);        
    });
    setUserEmail('');
    setUserPw('');
    //firebase에 유저 정보를 추가한다.
  }

  const handleFarmerClick = ()=>{
    console.log("이전", isFarmer);
    setIsFarmer(prev => !prev);
  }

  const checkEmail = (e)=>{
    e.preventDefault();
    //우선은 바로 idCheck 를 true로 바꾸겠다.
    checkPrevIDs().then(result=>{
      console.log("받아온 결과", result)
      if (result){
        let bool = result.includes(userEmail);
        console.log("포함?", bool);
        setIdCheck(bool);
        setPresent(bool);
      }
    });

    //let bool = result.include(userEmail);
    //setIdCheck(bool);
    //setPresent(bool);
    //추후 firebase에서 user/ => 각각의 user id를 Object.values()로 받은 후 email 존재 여부 확인할 것
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    LogIn(userEmail, userPw, ()=>navigate('/'))
    .then((result)=>{
      console.log("로그인 결과", result);
    }).catch((error)=>console.log(error));
  }

  return (
    <div className='flex flex-col w-full items-center mt-10'>
      <div className='flex flex-col w-64 md:w-80'>
        <p className='text-brand font-bold  text-4xl md:text-6xl'>rooute</p>
        <p className='text-gray-700 font-bold text-xl md:text-3xl my-3'>{present ? '회원 로그인' : '회원 가입'}</p> 
        {!idCheck && present && (
          <div className='my-3 md:my-2'>
            <p className='text-xs mb-6'>농어부님들과 우리 모두를 연결해주는 진짜 농수산물</p>
            <p>산지직송 직거래 플랫폼, 루트입니다.</p>
            <p>농장에서 우리집까지 하루만에 도착하는 신선함을 경험하세요!</p>
        </div>)}
      </div>
      {/*처음 로그인 시도*/}
      {!idCheck && present && (
        <form onSubmit={checkEmail}>
          <input 
            className='w-64 md:w-72 border-b-2 border-brand bg-transparent focus:outline-none focus:border-fcs mt-9 p-2'
            placeholder='email 입력'
            type='email' 
            value={userEmail}
            autoComplete="on"
            onChange={handleEmailChange}
          />
        </form>)}
      {/*db에 email 존재 */}
      {idCheck && (
        <form className='flex flex-col items-center mt-5 gap-3'>
          <input 
            className='w-64 md:w-72 border-b-2 border-brand bg-transparent focus:outline-none focus:border-fcs p-2'
            placeholder='email 입력'
            type='email' 
            value={userEmail}
            autoComplete="on"
            onChange={handleEmailChange}
          />
          <input 
            className='w-64 md:w-72 border-b-2 border-brand bg-transparent focus:outline-none focus:border-fcs p-2 mb-5'
            placeholder='password(8~10자)'
            pattern='[0-9a-fA-F]{8,10}'
            type='password' 
            value={userPw}
            autoComplete="current-password"
            onChange={handlePwChange}
          />
          <button 
            className='bg-brand border rounded-md w-64 md:w-72 p-3 text-lg my-3'
            onClick={handleLogin}
          >로그인</button>
        </form>
      )}
      {!idCheck && !present && (
        <form className='flex flex-col items-center mt-5 gap-4'>
          <input 
            className='w-64 md:w-72 border-b-2 border-brand bg-transparent focus:outline-none focus:border-fcs p-2'
            placeholder='email 입력'
            type='email' 
            value={userEmail}
            autoComplete="on"
            onChange={handleEmailChange}/>
          <input 
            className='w-64 md:w-72 border-b-2 border-brand bg-transparent focus:outline-none focus:border-fcs p-2'
            placeholder='password(8~10자)'
            pattern='[0-9a-fA-F]{8,10}'
            type='password'
            value={userPw}
            autoComplete="current-password"
            onChange={handlePwChange}/>          
            <button 
              className='bg-brand border rounded-md w-64 md:w-72 p-3 text-lg my-3'
              onClick={handleAddClick}>회원 가입</button>     
            <div 
              className='text-xs mt-3 hover:cursor-pointer hover:text-fcs'
              onClick={handleFarmerClick}>
                {isFarmer ? "앗! 저는 농어부, 생산자가 아니에요!" : "혹시 농어부나 생산자이신가요?"}✅
            </div>
  
        </form>
      )}
    </div>
  );
}

