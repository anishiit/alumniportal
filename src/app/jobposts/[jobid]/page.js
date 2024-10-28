"use client"

import { useState } from 'react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Separator } from "@/components/ui/separator"

// Sample data based on the provided structure
const jobPost = {
  _id: "671eac0bebec5c0c70d9161a",
  title: "JNJNCJDjhdcbuydgyucw8989y",
  description: "j nsuichisuhq89u]\\\n;. ';cm hui hub yu uibj jb yuscgusxi\nxbuicuic",
  url: "axsxsxcscswdswdrvttbbbbt",
  postedBy: "670ea6e0602f7597190c86c6",
  postedByName: "Abhay Kant Mishra",
  createdAt: "2024-10-27T21:09:31.968Z",
  updatedAt: "2024-10-28T14:46:05.028Z",
  thumbnail: "https://res.cloudinary.com/dcqgytpzz/image/upload/v1730063369/Acer_Wallpaper_01_3840x2400_xm0fky.jpg",
  comments: [
    {
      _id: "671fa2185d5cdc18fe5fc976",
      author: "670ea6e0602f7597190c86c6",
      authorname: "Abhay Kant Mishra",
      content: "abc",
      createdAt: "2024-10-28T14:39:20.940Z"
    },
    {
      _id: "671fa219d7dec3559cbfee7b",
      author: "670ea6e0602f7597190c86c6",
      authorname: "Abhay Kant Mishra",
      content: "abc",
      createdAt: "2024-10-28T14:39:21.005Z"
    }
  ]
}

export default function JobPostPage() {
  const [newComment, setNewComment] = useState('')

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the comment to your backend
    console.log('Submitting comment:', newComment)
    setNewComment('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{jobPost.title}</CardTitle>
          <CardDescription>
            Posted by {jobPost.postedByName} • {formatDistanceToNow(new Date(jobPost.createdAt), { addSuffix: true })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video relative mb-6">
            <image
              src={jobPost.thumbnail}
              alt="Job thumbnail"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="text-lg mb-4 whitespace-pre-wrap">{jobPost.description}</p>
          <Button asChild>
            <a href={jobPost.url} target="_blank" rel="noopener noreferrer">Apply for this job</a>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {jobPost.comments.map((comment) => (
            <div key={comment._id} className="mb-4 w-full">
              <div className="flex items-center mb-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{comment.authorname[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{comment.authorname}</span>
                <span className="text-muted-foreground ml-2 text-sm">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
              {/* <Separator className="my-2" /> */}
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="w-full">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}