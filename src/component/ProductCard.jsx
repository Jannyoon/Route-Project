import React from 'react';

export default function ProductCard({data : 
  {imgFirst, option, productId, title}}) {
  
  const viewOption = option.split(",").map((op)=>op.trim().split(":"));
  const cardOption = viewOption[0][0];
  const price = viewOption[0][1];
  //console.log(viewOption)

  

  return (
    <div className='border w-40 md:w-48 h-68 flex flex-col justify-center items-center rounded-tr-3xl overflow-hidden cursor-pointer bg-white hover:border-brand'>
      <div className='w-full flex-shrink-0 basis-2/3 p-3'>
        <img className="w-full h-full" src={imgFirst}/>  
      </div>
      <div className='basis-1/3 w-full h-full flex-grow-0 p-1'>
        <div className='w-full h-1/4 whitespace-nowrap overflow-hidden text-ellipsis'>{title}</div>
        <div className='w-full h-2/5 whitespace-nowrap overflow-hidden text-ellipsis text-xs md:text-sm pb-2'>{cardOption}</div>
        <div className='w-full h-full text-lg'><p className='w-full h-full font-semibold'>{price??3000} ₩</p></div>
      </div> 
    </div>
  );
}

