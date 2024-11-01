"use client"

import jwt from "jsonwebtoken"
import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { getUserInvitationsUrl, getUserConnectionsUrl } from '@/urls/urls'
import Navbar2 from '@/components/header/Navbar2'
import { acceptUserInvitationUrl, cancleUserInvitationUrl, deleteUserConnectionUrl } from "@/urls/urls.js"



function Page() {

  // const [curr ,setCurr]=useState();
  const [x1, setx1] = useState(true);
  const [x2, setx2] = useState(false);
  const [myConnections, setConnections] = useState([]);
  const [myinvitations, setInvitations] = useState([]);
  const [isSomethingChamged, setChanged] = useState(Number(0))
  const [err, setErr] = useState("");
  const [user, setUser] = useState({});

  function handleMove(e) {
    if (x1 === true && x2 === false) {
      setx2(true);
      setx1(false);
    } else {
      setx2(false);
      setx1(true);
    }
  }


  async function getInvitations() {
    let user;
    if (typeof window !== undefined)
      user = localStorage.getItem("amsjbckumr")
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET)
    console.log(user);
    try {
      await axios.post(getUserInvitationsUrl, {
        userId: user._id
      }).then((res) => {
        console.log(res.data)
        setInvitations(res.data.invitations)
      })
        .catch((err) => {
          console.log(err)
          // setErr(err.)
        })
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async function getMyConnection() {
    let user;
    if (typeof window !== undefined)
      user = localStorage.getItem("amsjbckumr")
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET)
    try {
      console.log(user)
      await axios.post(getUserConnectionsUrl, {
        userId: user._id
      }).then((res) => {
        console.log(res.data.connectedUsers)
        setConnections(res.data.connectedUsers)
      })
        .catch((err) => {
          console.log(err)
          // setErr(err.)
        })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getInvitations();
    getMyConnection();
  }, [isSomethingChamged])

  async function handleAcceptInvitation(userIdInInvitations) {
    let user;
    if (typeof window !== undefined)
      user = localStorage.getItem("amsjbckumr")
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET)

    await axios.post(acceptUserInvitationUrl, {
      userId1: user?._id, userId2: userIdInInvitations
    })
      .then((res) => {
        console.log(res.data);
        setChanged(isSomethingChamged + 1);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  async function handleDeclineInvitation(userIdFromInvitations) {

    let user;
    if (typeof window !== undefined)
      user = localStorage.getItem("amsjbckumr")
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET)
    await axios.post(cancleUserInvitationUrl, {
      userId1: user?._id,
      userId2: userIdFromInvitations,
    })
      .then((res) => {
        console.log(res.data);
        setChanged(isSomethingChamged + 1);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  async function handleRemoveConnection(userId) {

    let user;
    if (typeof window !== undefined)
      user = localStorage.getItem("amsjbckumr")
    user = jwt.verify(user, process.env.NEXT_PUBLIC_JWT_SECRET)
    await axios.post(deleteUserConnectionUrl, {
      userIdToRemove: userId,
      fromUserId: user._id,
    })
      .then((res) => {
        console.log(res.data);
        setChanged(isSomethingChamged + 1);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  // useEffect(() => {

  // },[curr])

  return (
    <div>
      <Navbar2 />
      <div>

        <div className="mt-10  w-full flex-col justify-between space-y-4 flex md:flex md:flex-row">
          <div className="flex w-full items-end border-b border-gray-300">

            <div
              value={"invitations"}
              className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
              onClick={handleMove} >
              Invitations
            </div>
            <div
              value={"myconnections"}
              className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
              onClick={handleMove} >
              My Connections
            </div>

          </div>
        </div>
        {
          x1 === true ? (<div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Requests</span>
                        </th>


                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Status
                        </th>



                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {myinvitations?.map((person) => (
                        <tr key={person.name}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <Link href={`/profile/${person?.userId}`}>
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={person.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                </div>
                              </div>
                            </Link>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <div className="flex items-center gap-4">
                              <button onClick={(e) => { handleAcceptInvitation(person.userId) }}
                                className="bg-green-500 text-green-50 hover:bg-green-600 h-8 w-20 rounded-md">
                                Accept
                              </button>
                              <button onClick={(e) => { handleDeclineInvitation(person.userId) }}
                                className="bg-red-500 text-blue-50 hover:bg-red-600 h-8 w-20 rounded-md">
                                Decline
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>) : (<div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>My Connections</span>
                        </th>


                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Status
                        </th>



                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {myConnections?.map((person) => (
                        <tr key={person.name}>

                          <td className="whitespace-nowrap px-4 py-4">
                            <Link href={`/profile/${person?._id}`}>
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={person.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                  <div className="text-sm text-gray-700">{person.email}</div>
                                </div>
                              </div>
                            </Link>
                          </td>



                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <div className="flex items-center gap-4">

                              <button onClick={(e) => { handleRemoveConnection(person.userId) }} className="bg-red-500 text-blue-50 hover:bg-red-600 h-8 w-20 rounded-md">
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>)
        }



      </div>
    </div>
  )
}

export default Page


// 'use client'

// import { useState, useEffect } from 'react'
// import jwt from "jsonwebtoken"
// import axios from 'axios'
// import Link from 'next/link'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { getUserInvitationsUrl, getUserConnectionsUrl, acceptUserInvitationUrl, cancleUserInvitationUrl, deleteUserConnectionUrl } from '@/urls/urls.js'


// export default function UserConnections() {
//   const [connections, setConnections] = useState([])
//   const [invitations, setInvitations] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
  

//   const fetchUserData = () => {
//     let currUser = {};
//     if(typeof window !== 'undefined') {
//       const token = localStorage.getItem('amsjbckumr')
//       const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
//       currUser = decodedToken
//     }
//     setConnections(currUser?.connectedUsers)
//     setInvitations(currUser?.invitations)
//   }

//   useEffect(() => {
//     fetchUserData()
//   }, [])

//   const fetchData = async () => {
//     setIsLoading(true)
//     try {
//       const [invitationsRes, connectionsRes] = await Promise.all([
//         axios.post(getUserInvitationsUrl, { userId: decodedToken?._id }),
//         axios.post(getUserConnectionsUrl, { userId: decodedToken?._id })
//       ])
//       setInvitations(invitationsRes.data.invitations)
//       setConnections(connectionsRes.data.connectedUsers)
//     } catch (error) {
//       console.error('Error fetching data:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleInvitation = async (userId, accept) => {
//     try {
//       await axios.post(accept ? acceptUserInvitationUrl : cancleUserInvitationUrl, {
//         userId1: decodedToken?._id,
//         userId2: userId
//       })
//       fetchData()
//     } catch (error) {
//       console.error('Error handling invitation:', error)
//     }
//   }

//   const handleRemoveConnection = async (userId) => {
//     try {
//       await axios.post(deleteUserConnectionUrl, {
//         userIdToRemove: userId,
//         fromUserId: decodedToken?._id,
//       })
//       fetchData()
//     } catch (error) {
//       console.error('Error removing connection:', error)
//     }
//   }

//   const UserList = ({ users, type }) => (
//     <Card>
//       <CardHeader>
//         <CardTitle>{type === 'invitation' ? 'Invitations' : 'My Connections'}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {users.map((user) => (
//           <div key={user._id} className="flex items-center justify-between py-4">
//             <Link href={`/profile/${user._id}`} className="flex items-center space-x-4">
//               <Avatar>
//                 <AvatarImage src={user.image} alt={user.name} />
//                 <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-sm font-medium">{user.name}</p>
//                 {type === 'connection' && <p className="text-sm text-muted-foreground">{user.email}</p>}
//               </div>
//             </Link>
//             {type === 'invitation' ? (
//               <div className="space-x-2">
//                 <Button size="sm" onClick={() => handleInvitation(user._id, true)}>Accept</Button>
//                 <Button size="sm" variant="outline" onClick={() => handleInvitation(user._id, false)}>Decline</Button>
//               </div>
//             ) : (
//               <Button size="sm" variant="destructive" onClick={() => handleRemoveConnection(user._id)}>Remove</Button>
//             )}
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )

//   if (isLoading) return <div>Loading...</div>

//   return (
//     <Tabs defaultValue="invitations" className="w-full">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="invitations">Invitations</TabsTrigger>
//         <TabsTrigger value="connections">My Connections</TabsTrigger>
//       </TabsList>
//       <TabsContent value="invitations">
//         <UserList users={invitations} type="invitation" />
//       </TabsContent>
//       <TabsContent value="connections">
//         <UserList users={connections} type="connection" />
//       </TabsContent>
//     </Tabs>
//   )
// }