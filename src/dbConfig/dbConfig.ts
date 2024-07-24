import mongoose from "mongoose";

export default async function connectDB() {
  try {
    //connection making
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    //to verify connection
    connection.on("connected", () => console.log("MongoDB connected"));
    //event to verify error in connection
    connection.on("error", (error) =>
      console.log("Error in DB Connection: ", error)
    );
  } catch (error) {
    console.log("Error in MongoDB connection: ", error);
    process.exit();
    // or you can use following to close the connection
    // mongoose.connection.close()
  }
}
