const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,

            }
        )
        console.log('connected to DB')

    } catch (error) {
        console.error('the error is ',error.message)

    }
}
module.exports=connectDB