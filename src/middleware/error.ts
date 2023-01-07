import {Express, NextFunction, Request, Response} from "express"
import {STATUS_CODES} from "../utils/error-handler/error.interface";

export const globalErrorHandler = (app: Express) => {
	app.use((error:any, req: Request, res: Response, next: NextFunction) => {
		res.status(STATUS_CODES[error.httpStatus]).send(error.messages);
	});
}
