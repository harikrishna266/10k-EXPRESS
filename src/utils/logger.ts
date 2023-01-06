import pino from 'pino';
import express, {Express, NextFunction, Request, Response} from "express";


const log = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			timestampKey: `time`,
			translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l o'
		},
	}
});

export function logAllIOs(app: Express) {
	app.use((req: Request, res: Response, next: NextFunction) => {
		log.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
		res.on('finish', () => {
			log.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
		})
		next();
	})
}

export default log;
