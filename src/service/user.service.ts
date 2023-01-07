import UserModel from "../models/user.model";
import mongoose, {HydratedDocument} from "mongoose";
import {IUser, IUserDocument} from "../interfaces/user.interface";

export async function createNewUser(user:  Omit<IUser, "createdAt"| "updateAt" | "_id">) {
	try {
		return await UserModel.create(user)
	} catch (e: any) {
		throw new Error('422|Email id already taken');
	}
}

export async function validatePassword({email, password} : {email: string, password: string}) {
	try {
		const user = await UserModel.findOne({email}).select([ "id", 'password']) as HydratedDocument<IUserDocument>;

		if(!user) {
			return false
		}

 		const isPasswordValid = await user.comparePassword(password);
		if(!isPasswordValid) {
			return false;
		}
		return user;
	}catch(e) {

		throw new Error('403| User was not found!');
	}
}


export async function getUserDetails(sessionId: mongoose.Types.ObjectId ) {
	try {
		return UserModel.findById(sessionId).select(['name', 'email']);
	}catch (e: any) {
		throw new Error('403| User was not found!');
	}
}
