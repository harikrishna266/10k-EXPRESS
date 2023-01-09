import mongoose, {Schema} from "mongoose";
import {string} from "zod";

const ImageSchemaConfig = {
	name: {type: String, min: 3, max: 20, required: true},
	link: {type: String, required: true},
	createdAt: { type: Date, default:() =>  Date.now(), immutable: true},
	updateAt: {type: Date, default:() =>  Date.now()}
};

const imageSchema: Schema = new Schema(ImageSchemaConfig);


const ImageModel = mongoose.model('Image', imageSchema);
export default ImageModel

export interface IImage {
	name: string;
	link: string;
	valid: boolean;
	userAgent: string;
	password: string;
}

export interface IImageDocument extends IImage, mongoose.Document{
	createdAt: Date;
	updateAt: Date;
}

