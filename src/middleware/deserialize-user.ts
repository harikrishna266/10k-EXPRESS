import {get} from "lodash";
import {NextFunction, Request, Response} from "express";
import * as SessionSer from '../service/session.service';
import {verifyJwt} from "../utils/jwt.util";
import {UnAuthorized} from "../utils/error-handler/error.classes";
import {ISession, SessionModel} from "../models/session.model";

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
	const accessToken = (req.header('authorization') || '').replace(/Bearer\s/, "");
	if (!accessToken) {
		return next(new UnAuthorized());
	}

	const {decoded, expired, valid} = verifyJwt(accessToken, {algorithm: 'RS256'});
	if (expired || !valid) {
		return next(new UnAuthorized());
	}

	if (decoded) {
		const sessionId = get(decoded, "session_id") as string;
		const session = await SessionSer.getSessionById(sessionId)
		if (session) {
			res.locals.session = {userId: session.user, sessionId: session.id};
		}
	} else {
		return next(new UnAuthorized({message: 'Not able to decode token'}));
	}
	return next();


}
