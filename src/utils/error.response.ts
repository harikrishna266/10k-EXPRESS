import {Response} from "express";
import {codes} from "../interfaces/status-code";

export function unauthorized(res: Response) {
	return res.send(codes.UNAUTHORIZED.response).status(codes.UNAUTHORIZED.code);
}
