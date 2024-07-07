import React from 'react';
import AuthContextProvider from './context/useAuthContext';
import { Outlet } from 'react-router-dom';
import Navbar from './ui/Navbar';

export default function App() {
  return (

    <div className='w-11/12 md:w-4/6'>    
      <AuthContextProvider>  
        <Navbar/>
        <Outlet/>    
      </AuthContextProvider>
    </div>

  );
}

