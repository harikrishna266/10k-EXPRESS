import {nextMock as next, reqMock as req, resMock as res} from "../reqMock";
import * as de from "../../src/middleware/deserialize-user";
import * as token from "../../src/utils/jwt.util";
import {verifyJwt} from "../../src/utils/jwt.util";
import * as SessionSer from "../../src/service/session.service";
import {STATUS_CODES} from "http";
import {UnAuthorized} from "../../src/utils/error-handler/error.classes";

describe('Deserialize middleware ', () => {

	let header: any;
	let verifyJwt: any;
	let getSessionById: any;
	beforeEach(() => {
		jest.spyOn(res, 'status');
		jest.spyOn(res, 'send');
		header = jest.spyOn(req, 'header');
		verifyJwt = jest.spyOn(token, 'verifyJwt');
		getSessionById = jest.spyOn(SessionSer, 'getSessionById');
	})

	it('' , () => {
		expect(1).toBe(1);
	})
	describe('It should extract Authorization token', () => {
		it('check if authorization header', () => {
			header.mockImplementation(() => '')
			de.deserializeUser(req, res, next);
			expect(req.header).toBeCalledWith('authorization');
		})
	})

	describe('it should not process anything that does not have a Authorization token', () => {
		let invalid;
		let verifyJwt: any;
		beforeEach(() => {
			invalid = header.mockImplementation(() => '');
			verifyJwt =jest.spyOn(token, 'verifyJwt');
		})
		describe('TOKEN ABSENT', () => {
			it('should call next immediately and do not attempt to decode token', () => {
				de.deserializeUser(req, res, next);
				expect(next).toBeCalledWith(new UnAuthorized());
			})
		})

		describe('TOKEN PRESENT', () => {

			describe('INVALID', () => {
				beforeEach(() => {
					invalid = header.mockReturnValue('Bearer xxxxx');
					de.deserializeUser(req, res, next);
				})
				it('it should attempt to decode token', () => {
					expect(verifyJwt).toHaveBeenCalledTimes(1);
				})

				it('DO-NOT attempt to get user details if its EXPIRED || INVALID', () => {
					de.deserializeUser(req, res, next);
					expect(next).toBeCalledWith(new UnAuthorized());
					expect(getSessionById).not.toBeCalled();
				})
			})

			describe('VALID', () => {
				beforeEach(() => {
					invalid = header.mockReturnValue('Bearer valid');
					verifyJwt.mockReturnValue({ valid: true, expired: false, decoded: {id:1, user: 1} });
					getSessionById.mockReturnValue({id: 1, user: 1});
					de.deserializeUser(req, res, next);
				})

				it('it should attempt to decode token', () => {
					expect(verifyJwt).toHaveBeenCalledTimes(1);
					expect(getSessionById).toBeCalledTimes(1)
					expect(res.locals.session).toMatchObject({"userId": 1, "sessionId": 1})
				})
			})

		})




	})

})
