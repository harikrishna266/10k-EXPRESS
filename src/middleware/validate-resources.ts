import {NextFunction} from "express";


export const validate = (schema: any) => (req: any, res: any, next: NextFunction) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params
		});
		next();
	} catch (e: any) {
		return res.status(400).send(e.errors);
	}
}

