import {nextMock as next, reqMock as req, resMock as res} from "../reqMock";
import {codes} from "../../src/interfaces/status-code";
import authorizedUsersOnly from "../../src/middleware/authorized-users-only";

describe('Authorized users only | middleware ', () => {

	let header: any;
	beforeEach(() => {
		jest.spyOn(res, 'status');
		jest.spyOn(res, 'send');
		header = jest.spyOn(req, 'header');
	})

	describe('check for session to be set', () => {

		describe('ABSENT', () => {
			beforeEach(() => {
				authorizedUsersOnly(req, res, next);
			})
			it('Should send unauthorized', () => {
				expect(res.locals.session).toBeUndefined();
				expect(res.send).toBeCalledWith(codes.UNAUTHORIZED.response)
				expect(res.status).toBeCalledWith(codes.UNAUTHORIZED.code)
				expect(next).not.toBeCalled()
			})
		})
		describe('PRESENT', () => {
			beforeEach(() => {
				res.locals.session = true;
				authorizedUsersOnly(req, res, next);
			})
			it('Should send unauthorized', () => {
				expect(res.locals.session).toBeDefined();
				expect(res.send).not.toBeCalledWith(codes.UNAUTHORIZED.response)
				expect(res.status).not.toBeCalledWith(codes.UNAUTHORIZED.code)
				expect(next).toBeCalled()
			})
		})

	})


})
