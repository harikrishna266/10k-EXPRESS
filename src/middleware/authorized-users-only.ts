import {Request, Response, NextFunction} from "express";
import {unauthorized} from "../utils/error.response";


const authorizedUsersOnly = (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals && res.locals.session ? res.locals.session : false;
	if (!user) {
		return  unauthorized(res);
	}
	return next();
};

export default authorizedUsersOnly;
