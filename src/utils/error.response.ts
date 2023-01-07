import {Response} from "express";
import {codes} from "../interfaces/status-code";

export function unauthorized(res: Response) {
	return res.status(codes.UNAUTHORIZED.code).send(codes.UNAUTHORIZED.response);
}
