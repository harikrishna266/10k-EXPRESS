import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


export function signJwt(data: any, options: jwt.SignOptions) {
  	return jwt.sign({data}, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, options, );
}

export function verifyJwt(token: string) {

	try {
		const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as string);
		return {
			valid: true,
			expired: false,
			decoded: decoded.data,
		};
	} catch (e: any) {
		return {
			valid: false,
			expired: e.message === "jwt expired",
			decoded: null,
		};
	}
}
