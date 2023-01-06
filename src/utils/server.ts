import express, {Request, Response, Express} from "express";
import V1 from "../routes/router.v1";
import {connectDatabase} from "./connects";
import mongoose from "mongoose";
import {startListening} from "./listen";
import path from "path";
import {addCors} from "./cors";
import {addBodyParser} from "./bodyparser";
import {globalErrorHandler} from "./error";


export function addHealthCheckApi(app: Express) {
	app.get('/health-check', (req: Request, res: Response) => res.sendStatus(200));
}

export const addRoutes  = (app: Express): void => {
	app.use('/v1', V1); // add routes
}

export const setStaticDirectory = (app: Express): void => {
	app.use('/media',express.static(path.join(__dirname, '../../media')));
}


export  const bootstrap = (): Bootstrap => {
	const app =   express();
	app.use(express.json());
	addHealthCheckApi(app);
	return {
		app,
		addRoutes,
		connectDatabase,
		setStaticDirectory,
		startListening,
		addCors,
		addBodyParser,
		globalErrorHandler
	}
}

export type Bootstrap  = {
	app: Express;
	addRoutes: (app: Express) => void;
	connectDatabase: () => Promise<typeof mongoose>;
	setStaticDirectory: (app: Express) => void;
	startListening: (app: Express, log: () => void) => void;
	addCors: (app: Express) => void;
	addBodyParser: (app: Express) => void;
	globalErrorHandler: (app: Express) => void
}
