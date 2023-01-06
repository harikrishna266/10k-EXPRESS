import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export async function connectDatabase(): Promise<typeof mongoose> {
	const dbUri = process.env.dbURL as string;
	mongoose.set('strictQuery', false);
	return mongoose.connect(dbUri)
}

export default connectDatabase;
