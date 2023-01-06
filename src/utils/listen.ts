import {Express} from "express";

export const startListening = (app: Express, log: ()=> void ): void => {
	app.listen(process.env.PORT, () => log() );
}
