import mongoose from "mongoose";
import {promises} from "dns";
import {boolean} from "zod";

export interface IUserDocument extends IUser, Document {
 	isModified: () => boolean;
	comparePassword: (pass: string) => Promise<boolean>;

	getUserDetails: (a: any) =>  Promise<any>
}

export interface IUser {
	name: string;
	password: string;
	email: string;
	createdAt?: Date;
	updateAt?: Date;
	_id: typeof mongoose.Types.ObjectId

}
