export const user_backend_url = "http://localhost:3001"
export const chat_backend_url = "https://alumni-portal-chatservice-backend.onrender.com"
export const college_backend_url ="https://alumniportalcollegebackend.vercel.app"
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

export const connectUsersUrl = `${user_backend_url}/user/connectusers`

// post urls => 

export const getAllPostsUrl = `${user_backend_url}/post/getjobs`

export const postUserPostUrl = `${user_backend_url}/post/postjob`

export const getUserPostsUrl = `${user_backend_url}/post/getuserposts`

// chat urls =>

export const createChatOfUsers = `${chat_backend_url}/chat/createchat`

export const getUserChatsUrl = `${chat_backend_url}/chat/getuserchats`

export const getChatByIdUrl = `${chat_backend_url}/chat/getchatbyid`

// memories urls =>

export const getAllMemoriesUrl = `${user_backend_url}/memory/`// get

export const getUserMemoriesUrl = `${user_backend_url}/memory/getusermemories`

export const createMemoryUrl = `${user_backend_url}/memory/` // post

export const getMemoryByIdUrl = `${user_backend_url}/memory/getmemorybyid`  // id 

export const  addLikeOnMemoryUrl = `${user_backend_url}/memory/like`

export const  addCommentOnMemoryUrl = `${user_backend_url}/memory/comment`


//college url 

export const getAllCollegesUrl = `${college_backend_url}/college/`

export const getCollegeByIdUrl = `${college_backend_url}/college/`

export const registerCollegeUrl = `${college_backend_url}/college/register`

export const loginCollegeUrl = `${college_backend_url}/college/login`

export const getCollegeUsersUrl = `${college_backend_url}/college/getcollegeusers`

export const createCollegeEventUrl = `${college_backend_url}/event/createevent`

export const getCollegeEventsUrl = `${college_backend_url}/event/getcollegeevents`   

export const updateCollegeEventUrl = `${college_backend_url}/event/updateevent`

export const deleteCollegeEventUrl = `${college_backend_url}/event/deleteevent`