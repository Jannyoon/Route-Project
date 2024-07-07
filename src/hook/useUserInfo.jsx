import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useAuthContext } from '../context/useAuthContext';
import { getUserProfile } from '../api/firebase';

export default function useUserInfo() {
  const {user} = useAuthContext();
  const queryClient = useQueryClient();
  const uid = user && user.uid;

  const userProfile = useQuery({
    queryKey : ['users', uid||""],
    queryFn : ()=> getUserProfile(uid),
    enabled : !!uid
  });

  return {userProfile};
}

