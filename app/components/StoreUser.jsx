'use client'

import { useUser } from '@clerk/nextjs';
import useApp from '@/store/useApp';

export default function StoreUser() { 
    const setCurrentUser = useApp((state) => state.setCurrentUser)
    
    const { isLoaded, isSignedIn, user } = useUser();
    if (isLoaded && isSignedIn) {
      
      setCurrentUser({
        "firstName": user.firstName,
        "lastName": user.lastName,
        "id": user.id
      })
    }

}