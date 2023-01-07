import {Response} from "express";
import {codes} from "../../interfaces/status-code";
import {BaseError, CODES} from "./error.interface";

export function unauthorized(res: Response) {
	return res.status(codes.UNAUTHORIZED.code).send(codes.UNAUTHORIZED.response);
}

export class FormValidationError implements BaseError {
	httpStatus: CODES = 'BAD_REQUEST';
	messages : string[];
	constructor(messages: string) {
		this.messages = JSON.parse(messages);
	}
}

export class UnAuthorized implements BaseError {
	httpStatus: CODES = 'UNAUTHORIZED';
	messages;
	constructor(message = {message: 'Unauthorized User'}) {
		this.messages = message;
	}
}

