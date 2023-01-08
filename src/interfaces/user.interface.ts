import mongoose from "mongoose";
import {promises} from "dns";
import {boolean} from "zod";

export interface IUserDocument extends IUser {
 	isModified: () => boolean;
	comparePassword: (pass: string) => Promise<boolean>;
	getUserDetails: (a: any) =>  Promise<any>
}

export interface IUser {
	name: string;
	password: string;
	email: string;
}
