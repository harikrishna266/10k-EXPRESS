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

export async function getUserByEmailOrPhoneNumber({email, phone}: { email: string, phone: string }): Promise<HydratedDocument<IUser>| null> {
	try {
		return  UserModel.findOne({$or: [{email}, {phone}]});
		// if (!user) {
		// 	return false
		// }
		// const isPasswordValid = await user.comparePassword(password)
		// if (!isPasswordValid) {
		// 	return false;
		// }
		// return user;
	} catch (e: any) {
		throw new InternalServerError()
	}
}


export async function getUserDetails(sessionId: mongoose.Types.ObjectId) {
	try {
		return UserModel.findById<HydratedDocument<IUser>>(sessionId).select(['name', 'email']);
	} catch (e: any) {
		throw new InternalServerError()
	}
}

export async function getUserByEmail(email: String): Promise<number> {
	try {
		return UserModel.find({email}).count();
	} catch (e: any) {
		throw new InternalServerError()
	}
}
