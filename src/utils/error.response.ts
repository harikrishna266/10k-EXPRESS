import {Response} from "express";
import {codes} from "../interfaces/status-code";

export function unauthorized(res: Response) {
	return res.status(codes.UNAUTHORIZED.code).send(codes.UNAUTHORIZED.response);
}

export function formValidationError(res: Response, error: any) {
	return res.status(codes.FORMVALIDATION_ERRORS.code).send(error);
}
