import {Request, Response, NextFunction} from "express";


const authorizedUsersOnly = (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals && res.locals.session ? res.locals.session : false;
	if (!user) {
		return res.sendStatus(403);
	}
	return next();
};

export default authorizedUsersOnly;
