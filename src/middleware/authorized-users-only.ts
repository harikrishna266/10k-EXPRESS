import {Request, Response, NextFunction} from "express";
import {codes} from "../interfaces/status-code";


const authorizedUsersOnly = (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals && res.locals.session ? res.locals.session : false;
	if (!user) {
		return res.send({'message': 'UnAuthorized User'}).status(codes.UNAUTHORIZED);
	}
	return next();
};

export default authorizedUsersOnly;
