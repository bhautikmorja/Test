const jwt = require("jsonwebtoken")

async function authMiddleware(req,res,next){
    try {
        const accessToken = req.header("Authorization") ? req.header("Authorization").split(" ")[1] : null
        if(!accessToken){
            return res.status(401).json({message:"Unauthorized"})
        }

        const decoded = jwt.verify(accessToken,process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong"})
    }
}

module.exports = authMiddleware
