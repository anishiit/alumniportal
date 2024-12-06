// pages/auth/linkedin.tsx

"use client"

// import { useState } from 'react';
import { LINKEDIN_CONFIG } from '@/config/linkedin.js';
import { useEffect } from 'react';
// import { config } from 'next/dist/build/templates/pages';


export default function LinkedInAuth() {
    

    useEffect(() => {
        // console.log(LINKEDIN_CONFIG)    
    },[])

  const initiateLinkedInAuth = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CONFIG.CLIENT_ID}&redirect_uri=${LINKEDIN_CONFIG.REDIRECT_URI}&scope=${LINKEDIN_CONFIG.SCOPES}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={initiateLinkedInAuth}>
        Connect LinkedIn
      </button>
    </div>
  );
}