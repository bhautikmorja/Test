const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const routes  = require("./routes/IndexRoute.js")

app.use(routes)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server running on port ${port}`))