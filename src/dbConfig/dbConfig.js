import mongoose, { connect } from "mongoose";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on("connected", ()=>{
            console.log('Database Connected Successfully');
        });
        connection.on("error", (err)=>{
            console.log("MongoDB connection error. Please make sure MongoDB is running." + err);
            process.exit(); // to gracefully exit
        });
    } catch (error) {
        console.log('Database not connected');
        console.log(error);
    }
}

export default dbConnect;