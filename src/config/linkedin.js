// app/config/linkedin.ts
export const LINKEDIN_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
  CLIENT_SECRET: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET,
  REDIRECT_URI: `https://linklum.in/auth/linkedin/callback`,
  SCOPES: [
    'openid',
    // 'profile', 
    // 'email',
    // 'w_member_social',  // Enhanced profile access
    // 'r_liteprofile',    // Basic profile info
    'r_education'       // Educational details
  ].join(' ')
}