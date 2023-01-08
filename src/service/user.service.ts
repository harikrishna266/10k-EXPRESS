import UserModel from "../models/user.model";
import mongoose, {HydratedDocument} from "mongoose";
import {InternalServerError} from "../utils/error-handler/error.classes";
import {IUser} from "../interfaces/user.interface";

export async function createNewUser(user: any){
	try {
		return await UserModel.create(user)
	} catch (e: any) {
		throw new InternalServerError({message: 'Error creating user'});
	}
}

export async function validatePassword({email, password}: { email: string, password: string }) {
	try {
		const user = await UserModel.findOne({email}).select(["id", 'password']);
		if (!user) {
			return false
		}
		const isPasswordValid = await user
		if (!isPasswordValid) {
			return false;
		}
		return user;
	} catch (e: any) {
		throw new Error(e.message);
	}
}


export async function getUserDetails(sessionId: mongoose.Types.ObjectId) {
	try {
		return UserModel.findById<HydratedDocument<IUser>>(sessionId).select(['name', 'email']);
	} catch (e: any) {
		throw new Error(e.message);
	}
}

export async function getUserByEmail(email: String): Promise<number> {
	try {
		return UserModel.find({email}).count();
	} catch (e: any) {
		throw new Error(e.message);
	}
}
