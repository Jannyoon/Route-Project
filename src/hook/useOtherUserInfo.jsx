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

export default function useOtherUserInfo(otherUserId) {
  const queryClient = useQueryClient();

  const otherUserInfo = useQuery({
    queryKey : ['users', otherUserId||""],
    queryFn : () => getUserProfile(otherUserId),
    enabled : !!otherUserId,
  })

  return {otherUserInfo};
}

