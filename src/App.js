import React from 'react';
import AuthContextProvider from './context/useAuthContext';
import { Outlet } from 'react-router-dom';
import Navbar from './ui/Navbar';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query' 

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className='w-11/12 md:w-4/6'>    
      <AuthContextProvider>  
        <QueryClientProvider client={queryClient}>
          <Navbar/>
          <Outlet/>
        </QueryClientProvider>    
      </AuthContextProvider>
    </div>

  );
}

