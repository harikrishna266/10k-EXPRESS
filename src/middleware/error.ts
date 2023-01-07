import {Express, NextFunction, Request, Response} from "express"
import {BaseError, STATUS_CODES} from "../utils/error-handler/error.interface";

export const globalErrorHandler = (app: Express) => {
	app.use((error:BaseError, req: Request, res: Response, next: NextFunction) => {
			res.status(+STATUS_CODES[error.httpStatus]).send(error.messages);
	});
}
