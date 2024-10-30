"use client"

import Profile from '@/components/profile/profile'
import Posts from '@/components/profile/posts'
import { useEffect } from 'react';
function fetchUserByUsername(username) {
  // Replace with your actual data fetching logic
  return {
    username,
    profilePicture: '/frontend/public/image/wallpaperflare.com_wallpaper.jpg',
    isFollowing: false,
    posts: [
      { id: 1, imageUrl: '/post1.jpg' },
      { id: 2, imageUrl: '/post2.jpg' },
      { id: 3, imageUrl: '/post3.jpg' },
    ],
  };
}

export default function ProfilePage({ params }) {
  const { username } = params;
  const user = fetchUserByUsername(username);
  
  return <div >
    <Profile user={user} />
    <Posts />
  </div>
    ;
}
