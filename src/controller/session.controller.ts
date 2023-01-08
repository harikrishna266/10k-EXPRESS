import {NextFunction, Response, Request} from "express";
import * as sessionSer from "../service/session.service";
import * as userSer from "../service/user.service";
import {signJwt, verifyJwt} from "../utils/jwt.util";
import {ISessionDocument} from "../models/session.model";
import {HydratedDocument} from "mongoose";
import {IUserDocument} from "../interfaces/user.interface";
import {InternalServerError, sendData, UnAuthorized} from "../utils/error-handler/error.classes";


export async function login(req: Request<{}, { email: string, password: string }>, res: Response, next: NextFunction) {

	try {
		const user = await userSer.validatePassword(req.body) as HydratedDocument<IUserDocument>;
		if (!user) {
			return next(new UnAuthorized({message: 'Invalid email or password!'}))
		}

		const session = await sessionSer.createSession(user.id, req.get('user-agent') || '') as HydratedDocument<ISessionDocument>;
		const tokenInfo = {userId: user.id, sessionId: session.id};
		const accessToken = signJwt(tokenInfo, {expiresIn: process.env.ACCESS_TOKEN_TTL, algorithm: 'RS256'});
		const refreshToken = signJwt(tokenInfo, {expiresIn: process.env.REFRESH_TOKEN_TTL, algorithm: 'RS256'});
		return res.send({accessToken, refreshToken});

	} catch (e: any) {
		return next(new InternalServerError())
	}
}

export async function generateNewAccessToken(req: Request<{}, { email: string, password: string }>, res: Response, next: NextFunction) {
	try {
		const refreshToken = (req.header('x-refresh') || '') as string
		if (!refreshToken) {
			return next(new UnAuthorized())
		}

		const {valid, expired, decoded} = verifyJwt(refreshToken, {algorithm: 'RS256'});
		if (!valid || expired) {
			return next(new UnAuthorized())
		}

		if (!expired && valid) {
			const session = await sessionSer.getSessionById(decoded.sessionId) as HydratedDocument<ISessionDocument>; // check if the session id is valid and of so take the user.

			if (decoded.userId.toString() === session.user.toString() && session.valid) {
				const tokenInfo = {userId: decoded.userId.toString(), session_id: session.id.toString()};

				const options = {expiresIn: process.env.ACCESS_TOKEN_TTL};

				const accessToken = signJwt(tokenInfo, options);
				return res.send({accessToken: accessToken}).status(200);
			}
		}
		return next(new UnAuthorized())
	} catch (e: any) {
		return next(new UnAuthorized())
	}
}

export async function deleteSession(req: Request<{}, { email: string, password: string }>, res: Response, next: NextFunction) {
	try {
		const {sessionId} = res.locals.session;
		const session = await sessionSer.getSessionById(sessionId) as HydratedDocument<ISessionDocument>;
		session.valid = false;
		session.save();
		return next(new sendData({message: 'You are logged out!'}));
	} catch (e: any) {
		return next(new InternalServerError())
	}
}

