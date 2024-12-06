// pages/auth/linkedin/callback.tsx
"use client"

import { useEffect } from 'react';
// import { useRouter,usePathname } from 'next/navigation';

import { usePathname, useSearchParams } from "next/navigation";
import axios from 'axios';

export default function LinkedInCallback() {
  // const router = useRouter();
  const pathname = usePathname(); // e.g., "/products/item"
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code"); 
    // const category = searchParams.get("category");
    // const { code } = router.query;
    
    if (code) {
      // Send authorization code to backend
      axios.post(`${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/auth/linkedin/verify`, { code })
        .then(response => {
          // Handle successful authentication
          // Store token, redirect user
          console.log(response)
          // router.push('/dashboard');
        })
        .catch(error => {
          // Handle authentication failure
          console.log(error)
          // router.push('/login');
        });
    }
  }, [searchParams]);

  return <div>Processing LinkedIn Authentication...</div>;
}