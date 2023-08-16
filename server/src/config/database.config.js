import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
	try {
		mongoose.connection.on("connecting", () => {
			console.log("connecting");
		});
		mongoose.connection.on("connected", () => {
			console.log("connected");
		});
		mongoose.connection.on("disconnecting", () => {
			console.log("disconnecting");
		});
		mongoose.connection.on("disconnected", () => {
			console.log("disconnected");
		});
		await mongoose.connect(process.env.MONGODB_URL);
	} catch (error) {
		console.log("connect error", error)
	}
}