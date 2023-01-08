import {NextFunction, Request, Response} from "express";

import {createImage} from "../service/image.service";
import UserModel from "../models/user.model";
import mongoose from "mongoose";


export async function addImage(req: Request, res: Response, next: NextFunction) {
	try {
		const user: any = await UserModel.findById(res.locals.session.userId);
		const image = await createImage(req.file);
		user.images.push(image);
		user.save();
		res.status(200).send(image);
	} catch (e: any) {
		next('500| Internal server error');
	}
}

export async function searchImage(req: Request, res: Response, next: NextFunction) {

	try {
		const {limit, skip, search} = {limit: 10, skip: 0, search: '', ...req.query};

		const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
		const searchRgx = rgx(search);
		const images = await UserModel.aggregate([
			{
				$match: {
					$and: [
						{_id: new mongoose.Types.ObjectId(res.locals.session.userId)},
					]
				}
			},
			{
				$lookup: {
					"from": "images",
					"localField": "images",
					"foreignField": "_id",
					"as": "images",
					pipeline: [
						{
							$match: {
								name: {$regex: searchRgx, $options: 'i'}
							}
						}
					]
				}
			},
			{
				$unwind: {
					path: '$images',
				},
			},
			{
				$facet: {
					count: [{$count: "count"}],
					images: [{$skip: +skip}, {$limit: +limit}, ]
				}
			}
		]);
		res.status(200).send(images[0]);
	} catch (e: any) {
		next('409|Please try after some time')
	}
}
