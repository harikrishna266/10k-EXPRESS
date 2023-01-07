import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


export function signJwt(data: any, options: jwt.SignOptions) {
	const buffer = Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY as string,  'base64')
	let key = buffer.toString('ascii');
	return jwt.sign(data, key,  options);
}

export function verifyJwt(token: string,  options: jwt.SignOptions) {
 	const buffer = Buffer.from(process.env.ACCESS_TOKEN_PUBLIC_KEY as string,  'base64')
	let key = buffer.toString('ascii');
	try {
		const decoded: any = jwt.verify(token, key,  options, );
		return {
			valid: true,
			expired: false,
			decoded: decoded,
		};
	} catch (e: any) {
		return {
			valid: false,
			expired: e.message === "jwt expired",
			decoded: null,
		};
	}
}
