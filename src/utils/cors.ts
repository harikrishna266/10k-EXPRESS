import cors from "cors";
import {Express} from "express";

export const addCors = (app: Express) => {
	app.use(cors());
}

