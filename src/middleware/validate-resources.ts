import {NextFunction, Request, Response} from "express";
import {formValidationError} from "../utils/error.response";


export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params
		});
		next();
	} catch (e: any) {
		return formValidationError(res, e.errors);
	}
}

