import React from 'react';

export default function Button({text, onClick}) {
  return (
    <button 
    className='bg-brand border rounded-md w-64 md:w-72 p-3 text-lg my-3'
    onClick={onClick}>{text}</button>   
  );
}

