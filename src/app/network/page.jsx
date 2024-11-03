
'use client'

import { useState, useEffect } from 'react'
import jwt from "jsonwebtoken"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { getUserInvitationsUrl, getUserConnectionsUrl, acceptUserInvitationUrl, cancleUserInvitationUrl, deleteUserConnectionUrl } from '@/urls/urls.js'
import Navbar2 from '@/components/header/Navbar2'

export default function UserConnections() {
  const [connections, setConnections] = useState([])
  const [invitations, setInvitations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('amsjbckumr')
        if (token) {
          const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
          setCurrentUser(decodedToken)
          await fetchData(decodedToken._id)
        }
      }
    }
    fetchUserData()
  }, [])

  const fetchData = async (userId) => {
    setIsLoading(true)
    try {
      const [invitationsRes, connectionsRes] = await Promise.all([
        axios.post(getUserInvitationsUrl, { userId }),
        axios.post(getUserConnectionsUrl, { userId })
      ])
      setInvitations(invitationsRes.data.invitations)
      setConnections(connectionsRes.data.connectedUsers)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInvitation = async (userId, accept) => {
    try {
      await axios.post(accept ? acceptUserInvitationUrl : cancleUserInvitationUrl, {
        userId1: currentUser._id,
        userId2: userId
      })
      fetchData(currentUser._id)
    } catch (error) {
      console.error('Error handling invitation:', error)
    }
  }

  const handleRemoveConnection = async (userId) => {
    try {
      await axios.post(deleteUserConnectionUrl, {
        userIdToRemove: userId,
        fromUserId: currentUser._id,
      })
      fetchData(currentUser._id)
    } catch (error) {
      console.error('Error removing connection:', error)
    }
  }

  const filteredConnections = connections.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const UserList = ({ users, type }) => (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {users.map((user) => (
        <Card key={user._id} className="mb-4">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/profile/${user._id}`} className="font-medium hover:underline">
                  {user.name}
                </Link>
                {type === 'connection' && (
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                )}
              </div>
            </div>
            {type === 'invitation' ? (
              <div className="space-x-2">
                <Button size="sm" onClick={() => handleInvitation(user._id, true)}>Accept</Button>
                <Button size="sm" variant="outline" onClick={() => handleInvitation(user._id, false)}>Decline</Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => handleRemoveConnection(user._id)}>Remove</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  )

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="bg-background min-h-screen">
      <Navbar2 />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Network</h1>
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="connections">My Connections</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>
          <TabsContent value="connections">
            <Input
              type="search"
              placeholder="Search connections..."
              className="mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <UserList users={filteredConnections} type="connection" />
          </TabsContent>
          <TabsContent value="invitations">
            <UserList users={invitations} type="invitation" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}