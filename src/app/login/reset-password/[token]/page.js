"use client"

import { useState, useEffect } from 'react'
import { useRouter,usePathname } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import jwt from 'jsonwebtoken'
import axios from 'axios'

export default function ChangePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [email , setEmail] = useState('')
  const [userId , setUserId] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { toast } = useToast()
  const pathname = usePathname()
  // Placeholder user data - replace with actual user data fetching logic
 

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if(!userId){
        setError('Invalid token')
        return  
    }
    setError('')
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/user/changepassword`, { userId, newPassword: password })
        .then((res) => {
            // console.log(res.data);
            setMessage(res?.data?.msg);
            toast({
                variant: "green",
                description: "Password changed successfully",
            })
        })
        .catch((err) => {
            // console.log(err)
            setError(err?.response?.data?.msg)
            return
        })
    } catch (error) {
        // console.log(error)
        setError(error?.message)
        return
    }
    
    // Add your password change logic here
    // For example:
    // await changePassword(password)
    
    // router.push('/profile') // Redirect to profile page after successful password change
  }

  useEffect(() => { 
    if (password === confirmPassword) {
      setError('')
    }
  }, [password, confirmPassword])

  useEffect(() => {
        const token = pathname.replace('/login/reset-password/', '');
        // console.log(token);
        try {
            // console.log(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECERET);
            const decodedToken = jwt.decode(token);
            const { email,userId } = decodedToken;
            setEmail(email);
            setUserId(userId);

        } catch (error) {
            console.log(error);

            setError('Invalid token');
        }
  }, [])


  return (
    <div className="container mx-auto my-20 max-w-sm py-8 ">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Change Password</h1>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            
            <p className="text-sm text-gray-600">Email: {email}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              {message && (
                  <div className="text-green-500 text-sm mt-2">{message}</div>
              )}
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            <CardFooter className="flex justify-end mt-6">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white" disabled={password !== confirmPassword}>
                Change Password
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

