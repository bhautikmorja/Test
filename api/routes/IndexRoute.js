const router = require("express").Router()

const authRoute = require("./AuthRoute")

router.use(authRoute)

module.exports = router