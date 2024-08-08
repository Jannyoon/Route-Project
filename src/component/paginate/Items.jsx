import React from 'react';
import ProductCard from '../ProductCard';

export default function Items({currentItems}) {
  return (
    <div className='w-full mb-2 flex flex-wrap gap-2'>
      {currentItems && currentItems.map((product)=>{
            if (product[0]) return <div><ProductCard data={product[2]}/></div>
            else return <ProductCard data={product}/>
          })
        }
    </div>
  );
}

