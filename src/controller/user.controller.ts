import {NextFunction, Request, Response} from "express";
import * as userSer from "../service/user.service";
import {Conflict, InternalServerError, sendData} from "../utils/error-handler/error.classes";
import {HydratedDocument} from "mongoose";
import {IUser} from "../interfaces/user.interface";

export async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const emailExist = await userSer.getUserByEmail(req.body.email);

		if (emailExist == 0) {
			const {_id, email, name} = await userSer.createNewUser(req.body)  as HydratedDocument<IUser>;
			return res.send({_id, email, name});
		} else {
			next(new Conflict({message: 'Email already taken'}));
		}
	} catch (e: any) {
		next(new InternalServerError());
	}
}

export async function getUserDetails(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await userSer.getUserDetails(res.locals.session.userId) as HydratedDocument<IUser>;
		next(new sendData(user));
	} catch (e: any) {
		next(new InternalServerError());
	}
}
