'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar2 from '@/components/header/Navbar2';
import {postUserPostUrl} from "@/urls/urls.js"
import { Button } from '@/components/ui/button';
import useCloudinaryImageUploader from '@/services/cloudinary';

import { useToast } from '@/hooks/use-toast';
export default function ContactPageOne() { 

  const {
    previewUrl,
    uploading,
    error,
    handleImageChange,
    uploadImage
  } = useCloudinaryImageUploader();

  const [input , setInput] = useState({
      title:"",
      description:"",
      category:"",
      url:"",
  });
  const { toast } = useToast();

  const [thumbnail ,setThumbnail] = useState(undefined);
  const [msg,setmsg] = useState("");
  const [err,seterr] = useState("");
  const [isLoading , setLoading ] = useState(false);

  async function handleSubmit(e){
      setLoading(true)
      e.preventDefault();
      seterr("")
      setmsg("Posting..")
      console.log("posting job")
      let user;
      if(typeof window !== undefined){
          user = JSON.parse(localStorage.getItem("user-threads"))
      }
      if(!user) {
       alert("Please login to post a job")
       return;
      }
      console.log(user);
      let imageInfo = {}
      await uploadImage()
      .then((res) => {
        imageInfo = res;
      })
      .catch((err) => {
          console.log(err);
          seterr(err.message);
          setLoading(false);
          return ;
      });
    
      try {
          await axios.post(postUserPostUrl,{
            thumbnail:imageInfo,
            postedBy:user._id,
            postedByName:user.name,
            title:input.title,
            description:input.description,
            category:input.category,
            url:input.url
          })
          .then((res) => {
              console.log(res.data);
              setInput({
                title:"",
                description:"",
                category:"",
                url:"",
              })
              setThumbnail({});
              setmsg(String(res.data.msg).toUpperCase());
              setInput({ title:"", description:"", category:"", url:"" })
              setThumbnail({})
              setLoading(false)
          })
          .catch((err) => {
              console.log(err);
              setmsg("")
              seterr(err.response.data.message);
              setLoading(false);
              return
          })
      } catch (error) {
          console.log(error)
          setmsg("")
          seterr(error.message);
          setLoading(false);
          return
      }
  }
  



  return (
    <div>
      <Navbar2 />
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
      
        <div className="grid items-center justify-items-center mx-auto max-w-7xl  py-auto pt-8 md:pt-8">
            {/* contact from */}
            <div className="flex w-full flex-col items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl w-full font-bold text-gray-900 md:text-4xl">Post Job/Internship</p>
                {/* <p className="mt-4 text-lg text-gray-600">
                  Our friendly team would love to hear from you.
                </p> */}


                <form onSubmit={handleSubmit} className="mt-4 space-y-4  md:w-[500px] w-[350px]">
                  <div className="grid w-full items-center gap-1.5">

                    <p className='text-blue-700 text-center text-lg font-semibold '>{msg}</p>

                    <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="title"
                      >
                        Title*
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={input.title}
                        onChange={(e) => {
                            setInput({...input,title:e.target.value})
                        }}
                      />
                  </div>
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="description"
                    >
                      Description*
                    </label>
                    <textarea
                      className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      id="description"
                      value={input.description}
                      placeholder="Description"
                      onChange={(e) => {
                        setInput({...input,description:e.target.value})
                      }}
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="thumbnail"
                    >
                      Thumbnail
                    </label>
                    <div className='flex '>
                      <input type="file" onChange={handleImageChange} />
                      {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: "30px" }} />}
                    </div>
                  </div>
                  <div className="grid w-full  items-center gap-1.5 text-black">
                  <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="thumbnail"
                    >
                      Category*
                    </label>
                    <select
                      className="flex text-black h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      value={input.category}
                      onChange={(e) => {
                        setInput({...input,category:e.target.value})
                       }}
                    >
                        <option className='text-black dark:text-gray-300' value="">Select Category</option>
                        <option className='text-black dark:text-gray-300' value="internship">Internship</option>
                        <option className='text-black dark:text-gray-300' value="job">Job</option>
                    </select>
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="url"
                      >
                        Url
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="url"
                        id="url"
                        placeholder="url"
                        value={input.url}
                        onChange={(e) => {
                            setInput({...input,url:e.target.value})
                        }}
                      />
                  </div>
                  <p className='text-red-600 text-center text-base font-semibold'>{err}</p>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    {isLoading === false ? (<>Post</>) : (<>Posting...</>)}
                  </Button>
                </form>

              </div>
            </div>
        </div>
      </div>
 
    </div>
  )
}