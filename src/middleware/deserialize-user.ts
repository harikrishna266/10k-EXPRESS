import {get} from "lodash";
import {NextFunction, Request, Response} from "express";
import * as SessionSer from '../service/session.service';
import {HydratedDocument} from "mongoose";
import {ISessionDocument} from "../interfaces/session.interface";
import {verifyJwt} from "../utils/jwt.util";
import {unauthorized} from "../utils/error.response";

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
	const accessToken = (req.header('authorization') || '').replace(/Bearer\s/, "");
	if (!accessToken) {
		return unauthorized(res);
	}

	const {decoded, expired, valid} = verifyJwt(accessToken, { 	algorithm: 'RS256' });
	if (expired || !valid) {
		return unauthorized(res);
	}

	if (decoded) {
		const sessionId = get(decoded, "session_id");
		const session = await SessionSer.getSessionById(sessionId) as HydratedDocument<ISessionDocument> | false; // check if the session id is valid and of so take the user.
		if (session) {
			res.locals.session = {userId: session.user, sessionId: session.id};
		}
	}
	return next();
}
