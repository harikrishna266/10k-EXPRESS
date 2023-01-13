import {bootstrap} from "./utils/server";
import logger  from "./utils/logger";

const {app, ...methods} = bootstrap();


methods.setStaticDirectory(app);
methods.addCors(app);
methods.addHelmet(app);
methods.addBodyParser(app);

methods.connectDatabase().then(() => {
	logger.info('DB connected!');
});


methods.addRoutes(app);
methods.globalErrorHandler(app);



methods.startListening(app , () => logger.info('Listening...'));
