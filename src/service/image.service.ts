import ImageModel from "../models/image.model";
import {InternalServerError} from "../utils/error-handler/error.classes";


export async function createImage(image: any) {
	try {
		return await ImageModel.create({
			name: image.originalname,
			link: image.path
		});
	} catch (e: any) {
		throw new InternalServerError()
	}
}

