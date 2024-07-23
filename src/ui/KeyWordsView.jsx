import React from 'react';

export default function KeyWordsView({str}) {
  let keyWordList = str ? str.split(",").map(v => v.trim()) : [];
  return (
    <div className='w-full p-2 flex flex-wrap'>
      {keyWordList.map((keyword,idx) => <div className="flex-shrink-0 bg-slate-500 text-white px-1 text-sm mr-1" key={idx}>#{keyword}</div>)}
    </div>
  );
}

