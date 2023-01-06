import mongoose from "mongoose";
import {promises} from "dns";
import {boolean} from "zod";

export interface ISessionDocument extends ISession, Document {
	isModified: () => boolean;
	isValid: () => boolean;
}

export interface ISession {
	user: typeof mongoose.Types.ObjectId
	valid: Boolean
	userAgent: string
	createdAt: Date
	updateAt: Date

}
