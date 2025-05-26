const dbConnect = require("../utils/dbConnect")
const User = require("../modal/user")

const getUser = async (req,res)=>{
    try {
        await dbConnect()
        const findUser = await User.findById(req.user.id)
        if(!findUser){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"Welcome to the Home Page", user:findUser})       
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong"})
    }
}

module.exports = {getUser}
