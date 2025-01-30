const mongoose = require ('mongoose');

module.exports.connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected: '+conn.connection.host);
    } catch (error) {
        console.error('Error connectting to mongoDB: '+error.message);
        process.exit(1);  //1 means exit with failure, 0 with success
    }
}