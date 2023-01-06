import SessionModel, {ISessionDocument} from "../models/session.model";
import mongoose, {HydratedDocument} from "mongoose";
import {verifyJwt} from "../utils/jwt.util";
import {get} from "lodash";

export async function createSession(user: typeof mongoose.Types.ObjectId, userAgent: string) {
	try {
 		return await SessionModel.create({user, userAgent}, ) as HydratedDocument<ISessionDocument>;
	} catch (e: any) {
		throw new Error('500|Internal Server error');
	}
}


export async function getSessionById(sessionId: string): Promise<HydratedDocument<ISessionDocument>| false> {
	try {
		const session = await SessionModel.findById(sessionId) as HydratedDocument<ISessionDocument>
		return (!session || !session.valid) ? false : session;
	} catch (e) {
		throw new Error('500|Internal Server error');
	}

}

export async function reIssueAccessToken(refreshToken: string) {

}
