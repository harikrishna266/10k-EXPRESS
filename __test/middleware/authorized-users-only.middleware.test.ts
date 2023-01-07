import {nextMock as next, reqMock as req, resMock as res} from "../reqMock";
import authorizedUsersOnly from "../../src/middleware/authorized-users-only";
import {STATUS_CODES} from "../../src/utils/error-handler/error.interface";
import {UnAuthorized} from "../../src/utils/error-handler/error.classes";

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
				expect(next).toBeCalledWith(new UnAuthorized())
			})
		})
		describe('PRESENT', () => {
			beforeEach(() => {
				res.locals.session = true;
				authorizedUsersOnly(req, res, next);
			})
			it('Should send unauthorized', () => {
				expect(res.locals.session).toBeDefined();
				expect(res.send).not.toBeCalledWith(STATUS_CODES.UNAUTHORIZED)
				expect(res.status).not.toBeCalledWith(STATUS_CODES.UNAUTHORIZED)
				expect(next).toBeCalled()
			})
		})

	})


})
