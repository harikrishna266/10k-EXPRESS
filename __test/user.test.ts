import {bootstrap} from "../src/utils/server";
import * as UserService from "../src/service/user.service";
import * as SessionService from "../src/service/session.service";

import * as UserCont from "../src/controller/user.controller";
import * as SessionCont from "../src/controller/session.controller";
import * as Utils from "../src/utils/jwt.util";

const {app, ...methods} = bootstrap()
methods.addRoutes(app);

const userRegistrationInput = {
	email: "test@example.com",
	name: "Jane Doe",
	password: "Password123",
	confirm_password: "Password123",
};

const userRegistrationResponse = {
	_id: '63b1e4cb17ab55bbe59b4183',
	email: 'hdsss2@gmaisl.com1',
	name: '1sda22d'

}
const userLoginInput = {
	email: "test@example.com",
	password: "Password123",
}

const loginResponse = { accessToken: 'accessToken', refreshToken: 'refreshToken' };


describe("user", () => {

	describe("user registration", () => {
		describe("Given name, password, email and confirm_password  it should register the user ", () => {
			it("should return the user payload", async () => {
				const send = jest.fn();
				const userSer = jest
					.spyOn(UserService, "createNewUser")
					// @ts-ignore
					.mockReturnValue(userRegistrationResponse);
				const req =  {
					body: userRegistrationInput
				}
				const res = { send }
				const next = () => {}
				// @ts-ignore
				await UserCont.createUser(req, res, next)

				expect(userSer).toHaveBeenCalledWith(req.body);

				expect(send).toHaveBeenCalledWith(userRegistrationResponse);
			})
		})
	})

	describe("user login", () => {
		describe("Given   email and password provide with access token and refresh token", () => {
			it("access token and refresh token", async () => {
				const send = jest.fn();
				const get = jest.fn();

				const validatePassword = jest
					.spyOn(UserService, "validatePassword")
					// @ts-ignore
					.mockReturnValue(userRegistrationResponse);

				const createSession = jest
					.spyOn(SessionService, "createSession")
					// @ts-ignore
					.mockReturnValue({id: 1});

				const signJwt =  jest
					.spyOn(Utils, "signJwt")
					// @ts-ignore
					.mockReturnValue(loginResponse.accessToken);

				const req =  {
					body: userLoginInput,
					get
				}
				const res = { send }
				const next = () => {}
				// @ts-ignore
				await SessionCont.login(req, res, next)


				expect(validatePassword).toHaveBeenCalledWith(userLoginInput);
				expect(createSession).toHaveBeenCalledWith(userRegistrationResponse._id, '');
				expect(req.get).toHaveBeenCalledWith('user-agent');
				expect(signJwt).toHaveBeenCalledTimes(2);
 				expect(send).toHaveBeenCalledWith({
					accessToken: expect.any(String),
					refreshToken: expect.any(String),
				});
			})
		})
	})


})
