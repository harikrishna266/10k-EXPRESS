import {Express, NextFunction, Request, Response} from "express"

const StatusCode = {
	SUCCESS: {
		status: 200,
		message: ''
	},
	CREATED: {
		status: 201,
		message: ''
	},
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOTFOUND: 404,
	INTERNAL_SERVER_ERROR: 500
}
export const globalErrorHandler = (app: Express) => {
	app.use((error: keyof typeof StatusCode | string, req: Request, res: Response, next: NextFunction) => {
		const message = error.split('|');
		res.status(+message[0]).send({message: message[1]});
		next();
	});
}
