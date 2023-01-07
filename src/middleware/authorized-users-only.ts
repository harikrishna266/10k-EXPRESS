import {Request, Response, NextFunction} from "express";
import { UnAuthorized} from "../utils/error-handler/error.classes";


const authorizedUsersOnly = (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals && res.locals.session ? res.locals.session : false;
	if (!user) {
 		next(new UnAuthorized());
	}
	return next();
};

export default authorizedUsersOnly;
