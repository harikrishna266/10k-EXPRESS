import {bootstrap} from "../../src/utils/server";
import supertest from "supertest";
import {STATUS_CODES} from "../../src/utils/error-handler/error.interface";

const {app, ...methods} = bootstrap()
methods.addRoutes(app);
methods.globalErrorHandler(app)

describe('access token must be validated on every api calls other than login and register', () => {
	it(`it should return ${STATUS_CODES.UNAUTHORIZED}`, async () => {
		await supertest(app).get('/v1/user/details').expect(STATUS_CODES.UNAUTHORIZED);
		await supertest(app).post('/v1/user/logout').expect(STATUS_CODES.UNAUTHORIZED);
		await supertest(app).get('/v1/user/image/search').expect(STATUS_CODES.UNAUTHORIZED);
		await supertest(app).post('/v1/user/image/upload').expect(STATUS_CODES.UNAUTHORIZED);
		await supertest(app).post('/v1/user/image/edit').expect(STATUS_CODES.UNAUTHORIZED);
	})
 })


