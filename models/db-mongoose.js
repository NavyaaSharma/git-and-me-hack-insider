var mongoose=require('mongoose')
var validator=require('validator')

var users=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(user)
        {
            if(!validator.isEmail(user))
            {
                alert('invalid email syntax')
                location.href='/signup'
            }
        }
    },
    password:{
        type:String,
        required:true
    }
})

var userRegister=mongoose.model('userRegister',users)

module.exports=userRegister