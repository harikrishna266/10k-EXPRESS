import {nextMock as next, reqMock as req, resMock as res} from "../reqMock";
import * as UserCont from "../../src/controller/user.controller";
import * as SessionCont from "../../src/controller/session.controller";
import * as UserSer from "../../src/service/user.service";
import * as sessionSer from "../../src/service/session.service";
import * as Util from "../../src/utils/jwt.util";
import {UnAuthorized} from "../../src/utils/error-handler/error.classes";

describe('Session Controller', () => {
	let send: any;
	beforeEach(() => {
		jest.spyOn(res, 'status');
		send = jest.spyOn(res, 'send');
		jest.spyOn(Util, 'signJwt')
 	})

	describe('Login', () => {
		describe('VALID, email and password', () => {
			let validatePassword: any;
			let createSession: any;
			beforeEach(() => {
				req.body = { email: 'valid', password: 'valid' };
				validatePassword = jest.spyOn(UserSer, "validatePassword").mockImplementationOnce( (): Promise<any> => Promise.resolve({id: '1' }));
				createSession = jest.spyOn(sessionSer, "createSession").mockImplementationOnce( (): Promise<any> => Promise.resolve({id: '1' }));
			})

			it('should validate the email and password and return with access token and refresh token', async () => {
				await SessionCont.login(req, res, next);
				expect(validatePassword).toBeCalledWith(req.body);
				expect(createSession).toBeCalledWith('1', '');
				expect(Util.signJwt).toBeCalledTimes(2);
				expect(send).toBeCalledTimes(1);
			})
		})

		describe('INVALID, email and password', () => {
			let validatePassword: any;
			let createSession: any;
			beforeEach(() => {
				req.body = {email: 'invalid', password: 'invalid'};
				validatePassword = jest.spyOn(UserSer, "validatePassword").mockImplementationOnce((): Promise<any> => Promise.resolve(false));
				createSession = jest.spyOn(sessionSer, "createSession").mockImplementationOnce((): Promise<any> => Promise.resolve({id: '1'}));
			})
			it('should validate the email and password and return with access token and refresh token', async () => {
				await SessionCont.login(req, res, next);
				expect(validatePassword).toBeCalledWith(req.body);
				expect(next).toBeCalledWith(new UnAuthorized({message: 'Invalid email or password!'}));
				expect(createSession).not.toBeCalled()
			})
		})
	})
})
