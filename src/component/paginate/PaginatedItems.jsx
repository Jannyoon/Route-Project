import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Items from './Items';


export default function PaginatedItems({itemsPerPage, items, selected}) {
  const [itemOffset, setItemOffset] = useState(0);
  console.log("현재 items 출력", items);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(()=>{
    setItemOffset(0);
  },[selected, items])

  return (
    <div className='w-full h-full flex flex-col'>
      <Items currentItems={currentItems}/>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageLinkClassName={"pagination__link"}
        activeLinkClassName={"pagination__link__active"}
      />
    </div>
  );
}

