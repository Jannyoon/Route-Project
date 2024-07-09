import React, { Children, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { getAuthChanged, LogIn, LogOut } from '../api/firebase';

const authContext = createContext({Children});

export default function AuthContextProvider({children}) {
  const [nowUser, setNowUser] = useState();

  useEffect(()=>{
    getAuthChanged((nowUser)=>setNowUser(nowUser));
    console.log("확인중");
  },[]);

  return (
    <authContext.Provider value={{user:nowUser, LogIn, LogOut}}>
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext(){
  return useContext(authContext);
}

