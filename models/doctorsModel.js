const mongoose = require('mongoose');


//Defines Doctor schema with fields and validators
const doctorSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email must be provided'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password must be provided"],
        minLength:[8,"Password must have at least 8 characters!"],
        
    },
    passwordConfirmation:{
        type:String,
        required:[true,"Please enter the password confirmation"],
        validate:{ 
            validator :function(){
                return this.password == this.passwordConfirmation
                },
            msg:"Passwords did not match!",
            reason:"Password did not match"
        } 
    },
    name:{
        type:String,
        required:[true,"Doctor must have a name"]
    },
    license:{
        type:String,
        required:[true,"Doctor must provide a license number"]
    },
    birthdate:{
        type:Date
    },
    phone: String,
    speciality:String
})


//Apply the schema to create the Model
const Doctor = mongoose.model("doctor",doctorSchema);

//Exports the model
module.exports = Doctor;