const  { userData } =require("../Model/UserData.model")

const CheckEmail=async (req,res,next)=> {
    const {email} = req.body
    const existing = await userData.findOne({email})
    if (!existing) {
        next()
    }
    else {
        res.status(409).json({status:-1, message:"email already exist"})
    }
}

module.exports={CheckEmail}