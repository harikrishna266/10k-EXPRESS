import ImageModel from "../models/image.model";


export async function createImage(image: any) {
	try {
		return await ImageModel.create({
			name: image.originalname,
			link: image.path
		});
	} catch (e: any) {
		throw new Error('500|Internal Server error');
	}
}

