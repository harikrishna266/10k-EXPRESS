import {BaseError, CODES} from "./error.interface";


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

export class Conflict implements BaseError {
	httpStatus: CODES = "CONFLICT";
	messages;
	constructor(message = {message: 'Unauthorized User'}) {
		this.messages = message;
	}
}



export class InternalServerError implements BaseError {
	httpStatus: CODES = 'INTERNAL_SERVER_ERROR';
	messages;
	constructor(message = {message: 'Something went wrong, please try after some time'}) {
		this.messages = message;
	}
}


export class sendData implements BaseError {
	httpStatus: CODES = 'SUCCESS';
	messages;
	constructor(message : any) {
		this.messages = {message};
	}
}
