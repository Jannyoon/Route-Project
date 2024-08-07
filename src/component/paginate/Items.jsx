import React from 'react';
import ProductCard from '../ProductCard';

export default function Items({currentItems}) {
  return (
    <div className='w-full mb-2 flex flex-wrap gap-2'>
      {currentItems && currentItems.map((product)=>
         <ProductCard data={product[2]}/>
        )
        }
    </div>
  );
}

