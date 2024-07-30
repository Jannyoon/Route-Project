import React from 'react';
import { useState, useMemo } from 'react';

export default function FilterProducts() {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);

  const handleAdd1 = ()=>{
    setVal1(prev => prev+1);
  }

  const handleAdd2 = ()=>{
    setVal2(prev => prev+1);
  }

  const computedVal = useMemo(()=>{
    console.log("테스트용", val1*val1)
    return val1*val1;}, [val1]);
  console.log("computedValue", computedVal);
  
  return (
    <>
      <div>val1: {val1}</div>
      <div>val2: {val2}</div>
      <div>val3: {computedVal}</div>
      <br />
      <button type="button" onClick={handleAdd1}>
        Add val1
      </button>
      <button type="button" onClick={handleAdd2}>
        Add val2
      </button>
    </>
  );
}

