const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
const userData= mongoose.model("User", userSchema)


const userGoogleSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    googleId: String,
    picture: String,
})
const userGoogle = mongoose.model('userGoogle',userGoogleSchema)

module.exports={userData,userGoogle}
