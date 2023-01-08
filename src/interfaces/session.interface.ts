import mongoose from "mongoose";

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
