import helmet from "helmet";
import {Express} from "express";

export async function addHelmet(app: Express) {
	app.use(helmet());
};
