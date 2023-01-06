import {Express, NextFunction, Request, Response} from "express";
import logger from "./logger";

const logAPI = (app: Express) => {
	app.use((req: Request, res:Response, next: NextFunction) => {

		logger.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		/** Log the res */
		res.on('finish', () => {
			logger.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
		});
		next();
	});
}

export default logAPI;
