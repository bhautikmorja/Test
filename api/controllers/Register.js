const User = require("../modal/user")
const dbConnect = require("../utils/dbConnect")
const bcrypt = require("bcrypt")

const Register = async(req,res)=>{
    await dbConnect()
    try {
        let {name,email,password} = req.body
        password = await bcrypt.hash(password,10)
        await User.create({name,email,password})
        return res.status(200).json({message:"User Register"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Somethig went wrong.'})
    }
}

module.exports = {Register}
