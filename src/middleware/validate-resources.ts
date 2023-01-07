import {NextFunction, Request, Response} from "express";
import {FormValidationError} from "../utils/error-handler/error.classes";



export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params
		});
		next();
	} catch (e: any) {
		throw new FormValidationError(e.message)
	}
}

