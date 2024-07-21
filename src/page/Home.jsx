import React from 'react';
import Button from '../ui/Button';
import { LogOut } from '../api/firebase';
import { useAuthContext } from '../context/useAuthContext';
import { getAllProducts } from '../api/getfireStore';
import useServerProducts from '../hook/useServerProducts';

export default function Home() {
  const {user} = useAuthContext();

  const {getServerProducts} = useServerProducts();
  const {data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage} = getServerProducts;


  const content = data &&  data.pages.map((pagedummy)=> pagedummy.map((obj,idx)=>{
    //pagedummy.obj : [QuerySnapshot, {...스토리 정보}]
    let realData = obj[1];

    console.log("실제사용", realData);
    return <div>{realData.productId}</div>
  }))


  return (
    <div>
    
      <div>배너</div>
      <div>oo님 반가워요!</div>
      <div>상품 선택 영역</div>
      <section>
        <div>실시간 인기 Top 10</div>
        <div>캐러셀1</div>  
      </section>
      <section>
        <div>새로운 상품(15개만 실시간으로 불러올 것)</div>  
        <div>캐러셀2</div>
      </section>
      <section>
        <div>{content}</div>  
        <button onClick={()=>fetchNextPage()}>더 보기</button>
      </section>      
    </div>
  );
}

