import {get} from "lodash";
import {NextFunction, Request, Response} from "express";
import * as SessionSer from '../service/session.service';
import {HydratedDocument} from "mongoose";
import {ISessionDocument} from "../interfaces/session.interface";
import {verifyJwt} from "../utils/jwt.util";
import {UnAuthorized} from "../utils/error-handler/error.classes";

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
	const accessToken = (req.header('authorization') || '').replace(/Bearer\s/, "");
	if (!accessToken) {
		return next(new UnAuthorized({message: 'Invalid token'}));
	}

	const {decoded, expired, valid} = verifyJwt(accessToken, {algorithm: 'RS256'});
	if (expired || !valid) {
		return next(new UnAuthorized({message: 'Expired Token'}));
	}

	if (decoded) {
		const sessionId = get(decoded, "session_id");
		const session = await SessionSer.getSessionById(sessionId) as HydratedDocument<ISessionDocument> | false; // check if the session id is valid and of so take the user.
		if (session) {
			res.locals.session = {userId: session.user, sessionId: session.id};
		}
	} else {
		return next(new UnAuthorized({message: 'Not able to decode token'}));
	}
	return next();


}
