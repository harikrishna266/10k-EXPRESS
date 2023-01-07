import {NextFunction, Response, Request} from "express";
import * as sessionSer from "../service/session.service";
import * as userSer from "../service/user.service";
import {signJwt, verifyJwt} from "../utils/jwt.util";
import {ISessionDocument} from "../models/session.model";
import  {HydratedDocument} from "mongoose";
import {IUserDocument} from "../interfaces/user.interface";


export async function login(req: Request<{}, { email: string, password: string }>, res: Response, next: NextFunction) {

	try {
		const user = await userSer.validatePassword(req.body) as HydratedDocument<IUserDocument>;

		if (!user) {
			return res.status(409).send({message: ['This user was not found']});
		}

		const session = await sessionSer.createSession(user._id, req.get('user-agent') || '') as  HydratedDocument<ISessionDocument>;
		const tokenInfo = {userId: user.id, session_id :session._id};
		const accessToken = signJwt(tokenInfo,  {expiresIn: '10m', algorithm: 'RS256'});
		const refreshToken = signJwt(tokenInfo,  {expiresIn: '365d', algorithm: 'RS256'});
		return res.send({ accessToken, refreshToken });

	} catch (e: any) {
		next(e.message);
	}
}

export async function generateNewToken(req: Request<{}, { email: string, password: string }>, res: Response, next: NextFunction) {
	try {
		const refreshToken = (req.header('x-refresh') || '') as string
		const {valid, expired, decoded}  = verifyJwt(refreshToken, { algorithm: 'RS256'});
		if (!expired && valid) {
			const session = await sessionSer.getSessionById(decoded.session_id) as  HydratedDocument<ISessionDocument>; // check if the session id is valid and of so take the user.
			if(decoded.userId.toString() === session.user.toString() ) {
				const tokenInfo = {userId: decoded.userId.toString(), session_id : session._id.toString()};
				const options = { expiresIn: '10m' };
				const accessToken = signJwt(tokenInfo, options);
				return res.send({accessToken: accessToken}).status(200);
			}
		}
		return res.send({message: 'Invalid token'}).status(401);
	}catch (e: any) {
		return res.send({message: 'Invalid token'}).status(401);
	}
}

export async function deleteSession(req: Request<{}, { email: string, password: string }>, res: Response, next: NextFunction) {
	try {
		const {sessionId} = res.locals.session;
		const session = await sessionSer.getSessionById(sessionId) as HydratedDocument<ISessionDocument>;
		session.valid = false;
		session.save();
	} catch (e: any) {
		next(e.meesage);
 	}
}

