import mongoose  from "mongoose";

const connectDB = async () =>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URL);
       console.log("database is connected");

    } catch (error) {
        console.log(`Error in Mongodb Database ${error}`);
    }

}
export default connectDB;