const route = require("express").Router()

const {Register} =  require("../controllers/Register")
const {Login} =  require("../controllers/Login")
const {Home} = require("../controllers/Home")
const authMiddleware = require("../middleware/authMiddleware")
const {getUser} = require("../controllers/User")

route.post("/register",Register)
route.post("/login",Login)
route.get("/home",authMiddleware,Home)
route.get("/user",authMiddleware,getUser)

module.exports = route
