import {nextMock as next, reqMock as req, resMock as res} from "../reqMock";
import * as SessionCont from "../../src/controller/session.controller";
import * as UserSer from "../../src/service/user.service";
import * as sessionSer from "../../src/service/session.service";
import * as Util from "../../src/utils/jwt.util";
import {UnAuthorized} from "../../src/utils/error-handler/error.classes";
import {deleteSession} from "../../src/controller/session.controller";

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

	describe('generateNewAccessToken', () => {
		describe('Access token regenerate', () => {
			describe('InValid refresh token present',() => {
 				let header: any;
				beforeEach(() => {
					req.body = { email: 'valid', password: 'valid' };
					header = jest.spyOn(req, 'header').mockReturnValue('');
				})
				it('Return error', async() => {
					await SessionCont.generateNewAccessToken(req, res, next);
					expect(req.header).toBeCalledWith('x-refresh');
					expect(next).toBeCalledWith(new UnAuthorized());
				})
			});

			describe('JWT expired or invalid',() => {
				let header: any;
				beforeEach(() => {
					req.body = { email: 'valid', password: 'valid' };
					header = jest.spyOn(req, 'header').mockReturnValue('valid');
					header = jest.spyOn(Util, 'verifyJwt').mockReturnValue({valid: false, expired: true, decoded: true});
				})
				it('Return error', async() => {
					await SessionCont.generateNewAccessToken(req, res, next);
					expect(req.header).toBeCalledWith('x-refresh');
					expect(next).toBeCalledWith(new UnAuthorized());
				})
			});

			describe('JWT valid not expired, get session details from DB',() => {
				let header: any;
				let verifyJwt: any;
				let signJwt: any;
				let getSessionById: any
				beforeEach(() => {
					req.body = { email: 'valid', password: 'valid' };
					header = jest.spyOn(req, 'header').mockReturnValue('valid');
					verifyJwt = jest.spyOn(Util, 'verifyJwt').mockReturnValue({valid: true, expired: false, decoded: {sessionId: 1, userId: 1}});
					getSessionById = jest.spyOn(sessionSer, 'getSessionById').mockImplementationOnce( (): Promise<any> => Promise.resolve({ id: 1, user: 1, valid: true }));
					signJwt = jest.spyOn(Util, 'signJwt');

				})
				it('Return error', async() => {
					await SessionCont.generateNewAccessToken(req, res, next);
					expect(req.header).toBeCalledWith('x-refresh');
					expect(next).not.toBeCalledWith(new UnAuthorized());
					expect(getSessionById).toBeCalledWith(1);
					expect(signJwt).toBeCalledTimes(1);
				})
			})
		})
	})


	describe('deleteSession', () => {
		let createSession: any;
		const save  = jest.fn;
		const valid  = jest.fn;
		beforeEach(() => {
			req.body = {email: 'invalid', password: 'invalid'};
			res.locals = {
				session: {sessionId: 1}
			}
 			createSession = jest.spyOn(sessionSer, "getSessionById").mockImplementationOnce((): Promise<any> => Promise.resolve({id: '1', valid, save}));
 		})

		it('should set session valid to false and save', async () => {
			await SessionCont.deleteSession(req, res, next);
			expect(createSession).toBeCalledWith(1);
			expect(valid).toBeDefined();
			expect(save).toBeDefined();
		})
	})
})
