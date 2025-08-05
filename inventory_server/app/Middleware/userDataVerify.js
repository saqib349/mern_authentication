const joi = require('joi')

const signupVerify = (req,res,next) => {
    const Schema= joi.object({
        fullName: joi.string().min(3).max(15).required(),
        userName: joi.string().min(3).max(15).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(15).required(),
        Cpassword: joi.string().min(5).max(15).required(),

    })
    const {error} = Schema.validate(req.body)
    if (error) {
        return res.status(403).json({
            msg:"no field should be empty",
            success: false,
            message: error.details[0].message
        })
    }
    next()
}

const loginVerify = (req,res,next) => {
    const Schema= joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).max(15).required(),

    })
    const {error} = Schema.validate(req.body)
    if (error) {
        return res.status(405).json({
            msg:"no field should be empty",
            success: false,
            message: error.details[0].message
        })
    }
    next()
}


module.exports={signupVerify,loginVerify}