import {bootstrap} from "../src/utils/server";
import supertest from "supertest";
import {MongoMemoryServer} from "mongodb-memory-server";

import mongoose from "mongoose";

const {app, ...methods} = bootstrap()
methods.addRoutes(app);

describe('User Login and Registration using mongo memory', () => {

	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});

	describe('Registration form validation', () => {
		it('An error should be throw if form values are not valid', async () => {
			const test = await supertest(app).post('/v1/register').send().expect(500);
 		})
	})

	describe('Login form validation', () => {
		it('An error should be throw if form values are not valid', async () => {
			const test = await supertest(app).post('/v1/login').send({}).expect(500);
 		})
	})

	describe('Register User', () => {
		it('When valid user details are provided, it should return 200 ok', async () => {
			await supertest(app).post('/v1/register', ).send({
				email: 'admin@gmail.com',
				password: '123123',
				name: 'hari',
				confirm_password: '123123'}).expect(200);
		})
	})



 	describe('Should be able to login', () => {
		it('When a valid username and password is given, it should return 200 ok and respond with access token and refresh token', async () => {
			const test = await supertest(app).post('/v1/login', ).send({email: 'admin@gmail.com', password: '123123'}).expect(200);
			 expect(test.body).toHaveProperty('accessToken');
		})
	})
});


