import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery
} from '@tanstack/react-query'
import { getNextItems } from '../api/getfireStore';


export default function useServerStory(){

  const getItems = useInfiniteQuery({
    queryKey : ['ROOTUE PROJECT', 'Story', 'storyID'],
    queryFn : getNextItems,
    initialPageParam : 0,
    getNextPageParam : (lastPage, allPages)=>{
      console.log({lastPage, allPages});
      console.log("전달받은 querySnapshot", lastPage);      

      if (lastPage.length<2){
        return null;
      }
      return lastPage[lastPage.length-1][0];
    }
  })

  return {getItems}
}

