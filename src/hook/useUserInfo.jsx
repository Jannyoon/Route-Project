import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useAuthContext } from '../context/useAuthContext';
import { getUserProfile, removeUser } from '../api/firebase';
import { getAuth } from 'firebase/auth';
import { updateFarmerInfo } from '../api/firebase';

const auth = getAuth();

export default function useUserInfo() {
  const {user, LogOut} = useAuthContext();
  const queryClient = useQueryClient();
  const uid = user&& user.uid

  const userProfile = useQuery({
    queryKey : ['users', uid||""],
    queryFn : ()=> getUserProfile(uid),
    enabled : !!uid
  });

  const newSetFarmerInfo = useMutation({
    mutationFn : (userInfo)=> updateFarmerInfo(uid, userInfo),
    onMutate:()=>{
      console.log("실행중");
    },
    onSuccess : ()=>{
      console.log("요청 성공")
      queryClient.invalidateQueries({queryKey:['users', uid||""]});
      queryClient.invalidateQueries({queryKey:['Farmers', uid||""]});
    },
    onError : (result)=>{
      console.log("요청 실패");
      console.log(result);
    }
  })

  const logOutUser = useMutation({
    mutationFn : LogOut,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey:[auth]})
    }
  })

  const deleteAuth = useMutation({
    mutationFn : ()=>removeUser(uid),
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey:['users', uid||""]});
      queryClient.invalidateQueries({queryKey:['FOR_ID_CHECK', uid||""]});      
      //firebase 데이터 삭제 후 authentication 삭제
      console.log("삭제완료")
    }
  })

  
  return {userProfile, newSetFarmerInfo, logOutUser, deleteAuth};
}

