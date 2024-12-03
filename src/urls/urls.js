"use client"

export const user_backend_url = `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}`
export const chat_backend_url = `${process.env.NEXT_PUBLIC_CHAT_BACKEND_URL}`
export const college_backend_url = `${process.env.NEXT_PUBLIC_COLLEGE_BACKEND_URL}`
// user urls => 

export const registerUserUrl = `${user_backend_url}/user/register`
export const loginUserUrl = `${user_backend_url}/user/login`
export const getUserInfoUrl = `${user_backend_url}/user/getuser`
export const updateUserProfileUrl = `${user_backend_url}/user/updateprofile`

export const getUserInvitationsUrl = `${user_backend_url}/user/getinvitations`

export const createUserInvitationUrl = `${user_backend_url}/user/createinvitation`
export const acceptUserInvitationUrl = `${user_backend_url}/user/acceptinvitation`
export const cancleUserInvitationUrl = `${user_backend_url}/user/cancleinvitation`
export const getUserConnectionsUrl = `${user_backend_url}/user/getconnectedusers`

export const deleteUserConnectionUrl = `${user_backend_url}/user/deleteconnection`

export const getAllCollegeUsersUrl = `${user_backend_url}/user/getcollegeusers`

export const getAllUsersOfCollegeUrl = `${user_backend_url}/user/getallcollegeusers`

export const connectUsersUrl = `${user_backend_url}/user/connectusers`

// deleting asset from server

export const deleteAssetUrl = `${user_backend_url}/delete`

// post urls => 

export const getAllPostsUrl = `${user_backend_url}/post/getjobs`

export const postUserPostUrl = `${user_backend_url}/post/postjob`

export const getUserPostsUrl = `${user_backend_url}/post/getuserposts`

export const getPostByIdUrl = `${user_backend_url}/post/getpostbyid`

export const addCommentOnPostUrl = `${user_backend_url}/post/addcomment` // content, postId, postedBy

export const deletePostUrl = `${user_backend_url}/post/deletepost` // postId

// chat urls =>

export const createChatOfUsers = `${chat_backend_url}/chat/createchat`

export const getUserChatsUrl = `${chat_backend_url}/chat/getuserchats`

export const getChatByIdUrl = `${chat_backend_url}/chat/getchatbyid`

// memories urls =>

export const getAllMemoriesUrl = `${user_backend_url}/memory/`// get

export const getUserMemoriesUrl = `${user_backend_url}/memory/getusermemories`

export const createMemoryUrl = `${user_backend_url}/memory/` // post

export const getMemoryByIdUrl = `${user_backend_url}/memory/getmemorybyid`  // id 

export const addLikeOnMemoryUrl = `${user_backend_url}/memory/like`

export const addCommentOnMemoryUrl = `${user_backend_url}/memory/comment`

export const deleteMemoryUrl = `${user_backend_url}/memory/deletememory` // memoryId


//college url 



export const registerCollegeUrl = `${college_backend_url}/college/register`

export const loginCollegeUrl = `${college_backend_url}/college/login`

export const getCollegeUsersUrl = `${college_backend_url}/college/getcollegeusers`

export const addFeaturedAlumniUrl = `${college_backend_url}/college/addfeaturedalumni`

export const createCollegeEventUrl = `${college_backend_url}/event/createevent`

export const getCollegeEventsUrl = `${college_backend_url}/event/getcollegeevents`

export const updateCollegeEventUrl = `${college_backend_url}/event/updateevent`

export const deleteCollegeEventUrl = `${college_backend_url}/event/deleteevent`

export const createStudenthubUrl = `${college_backend_url}/studenthub/create`

export const getStudenthubUrl = `${college_backend_url}/studenthub/get`

 

// feedbackURl

export const getFeedbacksUrl = `${user_backend_url}/feedback/getallfeedback`

export const postFeedbackUrl = `${user_backend_url}/feedback/createfeedback`

// admin dashboard urls

export const getAllCollegesUrl = `${college_backend_url}/college/getallcolleges`

export const verifyCollegeUrl = `${college_backend_url}/college/verifycollege`

export const getNonVarifiedCollegesUrl = `${college_backend_url}/college/getnonverifiedcolleges`

export const blockCollegeUrl = `${college_backend_url}/college/blockcollege`

export const rejectverifyCollegeUrl = `${college_backend_url}/college/deletecollege`

export const getAllCollegeCountUrl = `${college_backend_url}/college/getallcollegecount`

export const getAllStudentsCountUrl = `${user_backend_url}/user/getallstudentcount`

export const getAllAlumniCountUrl = `${user_backend_url}/user/getallalumnicount`
