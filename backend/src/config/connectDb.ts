import mongoose, { connection } from "mongoose";

async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_DB_URL as string);
  } catch (e) {
    console.log(`error occured ${e}`);
  }
}
export default connectDb;
