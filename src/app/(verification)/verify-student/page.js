'use client'

import { useState ,useEffect } from 'react'
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react'
import jwt from 'jsonwebtoken';
import VerificationBenefits  from '@/components/verification-benefits'
import axios from 'axios';
import { getEmailDomain } from '@/data/emailDomains';
export default function VerificationPage() {
  const [email, setEmail] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState()
  const [emailSuffix , setEmailSuffix] = useState("");
  useEffect(() => {
      if (typeof window !== 'undefined') {
          let user = localStorage.getItem('amsjbckumr')
          if(!user) {
              window.location.href = '/login'
              return
          }

          user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET)
          setUser(user)
          // setCollegeName(user.collegeName)
          setEmailSuffix(getEmailDomain(user.collegeName))
          console.log(user)
          
      }
  } , [])
  const handleSubmit = async (e) => {
    setVerificationStatus('idle')
    e.preventDefault()
    // const fullEmail = `${emailPrefix}@iitism.ac.in`

    if (!email) {
      setVerificationStatus('error')
      setMessage('Please enter your email.')
      return
    }

    const suffix = email.split('@')[1]
    if (suffix !== emailSuffix) {
      setVerificationStatus('error')
      setMessage('Please enter a valid institute email address.')
      return
    }

    setVerificationStatus('loading')
    try {
      // Replace this URL with your actual backend verification endpoint
       await axios.post(`${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/user/sendstudentverificationmail`, {
        email: email, collegeName: user.collegeName, userId: user._id
      })
      .then((res) => {
       
        setMessage(res.data.msg);
        setVerificationStatus('success');
       })
        .catch((error) => {
            
            setMessage(error.response.data.msg);
            setVerificationStatus('error');
        })
      } catch (error) {
        setVerificationStatus('error')
        setMessage('Verification failed. Please try again.')
      }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl w-full grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-blue-800">Verify Your LinkLum Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Institute Email{` (eg: example@${emailSuffix}) `}
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) =>{setVerificationStatus('idle'); setEmail(e.target.value.toLowerCase())}}
                  placeholder={`example@${emailSuffix}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {/* <span className="bg-gray-100 text-gray-600 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md">
                  @iitism.ac.in
                </span> */}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={verificationStatus === 'loading'}
            >
              {verificationStatus === 'loading' ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          {verificationStatus === 'loading' && (
            <div className="flex items-center justify-center mt-4">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <p className="ml-2 text-gray-600">Sending verification email...</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="flex items-center mt-4 bg-green-100 p-4 rounded-md">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
              <p className="ml-2 text-green-700">{message}</p>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="flex items-center mt-4 bg-red-100 p-4 rounded-md">
              <XCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
              <p className="ml-2 text-red-700">{message}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <VerificationBenefits />
        </div>
      </div>
    </div>
  )
}

