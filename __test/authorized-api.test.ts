import {bootstrap} from "../src/utils/server";
import supertest from "supertest";

const {app, ...methods} = bootstrap()
methods.addRoutes(app);

describe('access token must be validated on every api calls other than login and register', () => {
	it('it should return 403', async () => {
		await supertest(app).get('/v1/user/details').expect(403);
		await supertest(app).post('/v1/user/logout').expect(403);
		await supertest(app).get('/v1/user/image/search').expect(403);
		await supertest(app).post('/v1/user/image/upload').expect(403);
		await supertest(app).post('/v1/user/image/edit').expect(403);
	})
 })


