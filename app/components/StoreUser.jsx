'use client'

import { useUser } from '@clerk/nextjs';
import useApp from '@/store/useApp';

export default function StoreUser() { 
  const { isLoaded, isSignedIn, user } = useUser();
  const setCurrentUser = useApp((state) => state.setCurrentUser)

  if (isLoaded && isSignedIn) {
      
      setCurrentUser({
        "firstName": user.firstName,
        "lastName": user.lastName,
        "id": user.id
      })
    }

}