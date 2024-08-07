import React from 'react';
import ProductCard from '../ProductCard';

export default function Items({currentItems}) {
  return (
    <div className='w-full basis-8/12 mb-2 bg-green-500 flex flex-wrap gap-2'>
      {currentItems && currentItems.map((product)=>
         <ProductCard data={product[2]}/>
        )
        }
    </div>
  );
}

