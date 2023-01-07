import {NextFunction, Request, Response} from "express";
import * as userSer from "../service/user.service";

export async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const {_id, email, name} = await userSer.createNewUser(req.body);
		return res.send({_id, email, name});
	} catch (e: any) {
		next(e);
	}
}


export async function getUserDetails(req: Request, res: Response, next: NextFunction) {
	try {
 		const user = await userSer.getUserDetails(res.locals.session.userId);
		return res.status(200).send(user);
	} catch (e: any) {
		next(e.message);
	}
}
