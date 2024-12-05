'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { usePathname} from 'next/navigation'
import axios from 'axios';
export default function VerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState('loading')
  const [message, setMessage] = useState('')

  const pathname = usePathname();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = pathname.replace('/verify-email/student/', '');
        if(!token) {
          setVerificationStatus('error');
          setMessage('Verification failed. No verification token found.');
          return;
        }
        // Replace this URL with your actual backend verification endpoint
       await axios.post( `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/user/verifystudent`, {token}  )
       .then((res) => {
        console.log(res.data);
        setMessage(res.data.msg);
        setVerificationStatus('success');
       })
        .catch((error) => {
            console.log(error);
            setMessage(error.response.data.msg);
            setVerificationStatus('error');
        })
      } catch (error) {
        setVerificationStatus('error')
        setMessage('Verification failed. Please try again.')
      }
    }

    verifyUser()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Account Verification</h1>
        
        {verificationStatus === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">Verifying your account...</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="mt-4 text-green-600 font-semibold">{message}</p>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="h-16 w-16 text-red-500" />
            <p className="mt-4 text-red-600 font-semibold">{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
