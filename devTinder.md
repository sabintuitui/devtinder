// Dev Tinder API list

#authRouter
post/signup
post/login
post/logout

#profileRouter
get/profile/view
patch/profile/edit
patch/profile/password

#connectionRequestRouter
post/request/send/intrested/:userId
post/request/send/ignored/:userId


post/request/review/accpeted/:requestId
post/request/review/rejected/:requestId

#userRouter
get/user/connections
get/user/requests
get/feed



status: ignored, intrested,  accepted, rejected