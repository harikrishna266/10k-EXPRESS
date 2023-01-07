import {bootstrap} from "../../src/utils/server";
import supertest from "supertest";
import {codes} from "../../src/interfaces/status-code";

const {app, ...methods} = bootstrap()
methods.addRoutes(app);

describe('access token must be validated on every api calls other than login and register', () => {
	it('it should return 403', async () => {
		await supertest(app).get('/v1/user/details').expect(codes.UNAUTHORIZED.code);
		await supertest(app).post('/v1/user/logout').expect(codes.UNAUTHORIZED.code);
		await supertest(app).get('/v1/user/image/search').expect(codes.UNAUTHORIZED.code);
		await supertest(app).post('/v1/user/image/upload').expect(codes.UNAUTHORIZED.code);
		await supertest(app).post('/v1/user/image/edit').expect(codes.UNAUTHORIZED.code);
	})
 })


