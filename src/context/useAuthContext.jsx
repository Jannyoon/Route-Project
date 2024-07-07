import React, { Children, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { getAuthChanged, LogIn, LogOut } from '../api/firebase';

const authContext = createContext({Children});

export default function AuthContextProvider({children}) {
  const [nowUser, setNowUser] = useState();
  console.log("현재 로그인 된 유저", nowUser);
  useEffect(()=>{
    getAuthChanged((user)=>setNowUser(user))
  },[])

  return (
    <authContext.Provider value={{user:nowUser, LogIn, LogOut}}>
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext(){
  return useContext(authContext);
}

