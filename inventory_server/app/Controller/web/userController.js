const {userData, userGoogle} = require("../../Model/UserData.model");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const userSignup = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    hashPassword=await bcrypt.hash(password,10)

    const user = new userData({ fullName, userName, email, password:hashPassword });

    const resp = await user.save(); 

    res.status(201).json({
      status: 1,
      message: "User registered successfully",
      data: resp
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Error registering user",
      error: error.message
    });
  }
};

const userLogin=async (req,res)=> {
   try {
    const {email,password} = req.body
    const resp=await userData.findOne({email})
    console.log(resp)
    if (!resp) {
      
        return res.status(409).json({
        status: 0,
        message: "email is incorrect",
        
      })
    }

    const isMatched=  bcrypt.compare(password,resp.password)
    if (!isMatched){
       return res.status(409).json({
        status: 0,
        message: "password is incorrect",
       })
    }
    
        const token= jwt.sign({_id:resp._id, email},process.env.JWT_SECRET,{
          expiresIn: '24h'
        })
        res.status(201).json({
        status: 1,
        message: "successfully login",
        token
      })
    
    
  }
  catch(err) {
    res.status(500).json({
      status: 0,
      message: "user not found",
      error: err.message
    })
  }

  }

  const userGoogleSignup = async (req,res)=> {
      const { email, name, sub, picture } = req.body;

      try {
        let user = await userGoogle.findOne({ email });

        if (!user) {
          user = new userGoogle({ email, name, sub, picture });
          await user.save()
        }

        const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET || 'secretKey', {
          expiresIn: '24h',
        });
        

        res.json({
          message: 'Login successful',
          token,
          user,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
  } 

module.exports = { userSignup,userLogin,userGoogleSignup };
