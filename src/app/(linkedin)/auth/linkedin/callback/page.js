// pages/auth/linkedin/callback.tsx
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LinkedInCallback() {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    
    if (code) {
      // Send authorization code to backend
      axios.post(`${NEXT_PUBLIC_USER_BACKEND_URL}/auth/linkedin/verify`, { code })
        .then(response => {
          // Handle successful authentication
          // Store token, redirect user
          console.log(response)
          router.push('/dashboard');
        })
        .catch(error => {
          // Handle authentication failure
          console.log(error)
          router.push('/login');
        });
    }
  }, [router.query]);

  return <div>Processing LinkedIn Authentication...</div>;
}