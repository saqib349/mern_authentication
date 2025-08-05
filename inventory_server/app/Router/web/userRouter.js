const express= require("express")
const  {userSignup,userLogin, userGoogleSignup} = require("../../Controller/web/userController")
const {CheckEmail} = require("../../Middleware/CheckEmail")
const { signupVerify, loginVerify } = require("../../Middleware/userDataVerify")

const userRouter = express.Router()

userRouter.post('/signup',signupVerify,CheckEmail,userSignup)
userRouter.post('/login',loginVerify,userLogin)
userRouter.post('/google-auth',userGoogleSignup)

module.exports={userRouter}