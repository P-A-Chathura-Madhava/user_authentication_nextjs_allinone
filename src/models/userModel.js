import mongoose from "mongoose";

// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true, "[Please provide an email"],
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

//Export the model
const User = mongoose.models.users || mongoose.model('users', userSchema);  // mongoose always conversts to lowercase
export default User;