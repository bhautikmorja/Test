const route = require("express").Router()

const {Register} =  require("../controllers/Register")
const {Login} =  require("../controllers/Login")
const {Home} = require("../controllers/Home")
const authMiddleware = require("../middleware/authMiddleware")
const {getUser} = require("../controllers/User")
const { upload } = require("../utils/upload")
const { uploadImage } = require("../controllers/ImageUpload")

route.post("/register",Register)
route.post("/login",Login)
route.get("/home",authMiddleware,Home)
route.get("/user",authMiddleware,getUser)
route.post("/upload-image", authMiddleware, upload.single('image'), uploadImage);

module.exports = route
