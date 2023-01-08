import mongoose, {HydratedDocument, Schema} from "mongoose";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import {IUser, IUserDocument} from "../interfaces/user.interface";

dotenv.config();

const UserSchemaConfig = {
	name: {type: String, min: 3, max: 20, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true, unique: true, lowerCase: true},
	createdAt: {type: Date, default: () => Date.now(), immutable: true},
	updateAt: {type: Date, default: () => Date.now()},
	images: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Image'
		}
	],
};

const userSchema: Schema = new Schema<IUser>(UserSchemaConfig);

userSchema.pre('save', async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
	let user = this as HydratedDocument<IUser>;
	if (!this.isModified('password')) return next();

	if (!user.isModified) {
		return next();
	}
	const saltFactor = process.env["SALT_FACTOR "] as string;
	const salt = await bcrypt.genSalt(+saltFactor);
	const hash = bcrypt.hashSync(user.password, salt);
	user.password = hash;
	return next();
});


userSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	const user = this as IUserDocument;
	const result = await bcrypt.compare(candidatePassword, user.password)
	return result;
};

userSchema.methods.getUserById = async function (e: any) {
	const user = this as IUserDocument;
}

userSchema.methods.getUserByEmail = async function (e: any) {
	// const images = await UserModel.aggregate([
}

const UserModel = mongoose.model('User', userSchema);
export default UserModel


