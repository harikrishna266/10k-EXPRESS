import multer, {FileFilterCallback} from "multer";
import {Request, Response} from "express";
import path from "path";

export const storage = multer.diskStorage({
	destination: (
		request: Request,
		file: Express.Multer.File,
		callback: any
	): void => {
		callback(null, 'media');
	},

	filename: (
		req: Request,
		file: Express.Multer.File,
		callback: any
	): void => {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

export const fileFilter = (
	request: Request,
	file: Express.Multer.File,
	callback: FileFilterCallback
): void => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		callback(null, true)
	} else {
		callback(null, false)
	}
};
