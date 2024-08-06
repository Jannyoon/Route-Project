import React from 'react';
import AuthContextProvider from './context/useAuthContext';
import ProductsContextProvider from './context/useProductsContext';
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
    <div className='w-11/12 md:w-4/6 flex flex-col'>    
      <ProductsContextProvider>
        <AuthContextProvider>  
          <QueryClientProvider client={queryClient}>
            <Navbar/>
            <Outlet/>
          </QueryClientProvider>    
        </AuthContextProvider>
      </ProductsContextProvider>
    </div>

  );
}

