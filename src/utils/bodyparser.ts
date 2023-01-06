import {Express} from "express";
import bodyParser from "body-parser";

export const addBodyParser = (app: Express) => {
	app.use(bodyParser.json());
}

