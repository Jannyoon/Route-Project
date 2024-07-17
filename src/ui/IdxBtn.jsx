import React from 'react';

export default function IdxBtn({arr, currentIdx, containerWidth}) {
  return (
    <div className='absolute bottom-2 w-1/3 flex justify-center'
      style={{'left':`${containerWidth/2-(containerWidth/6)}px`}}
    >
      {arr.map((v,idx) => (
        <div className='mx-1 w-2 h-2 rounded-full'
          style={{'backgroundColor' : idx===currentIdx ? '#10B981' :'#fdba74'}}
        />
        ))}
    </div>
  );
}
