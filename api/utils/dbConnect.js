const mongoose =  require("mongoose")

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect