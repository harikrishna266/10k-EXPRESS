import authorizedUsersOnly from "../src/middleware/authorized-users-only";
import {nextMock as next, reqMock as req, resMock as res} from "./reqMock";
import {codes} from "../src/interfaces/status-code";


describe("Authorize middleware", () => {
	beforeEach(() => {
		jest.spyOn(res, 'status');
		jest.spyOn(res, 'send');
		jest.spyOn(res, 'send');
	})

	afterEach(() =>{
		jest.restoreAllMocks();
	})

	it(`If a session variable is not present then send ${codes.UNAUTHORIZED}`, async () => {
		authorizedUsersOnly(req, res, next);
		expect(res.locals.session).toBeUndefined();
		expect(res.send).toBeCalledWith({'message': 'UnAuthorized User'})
		expect(res.status).toBeCalledWith(codes.UNAUTHORIZED)
		expect(next).not.toBeCalled()
	})

	it("If a session variable is present then allow the request to continue", async () => {
		res.locals.session = true;
		authorizedUsersOnly(req, res, next);
		expect(res.locals.session).toBeDefined();
		expect(res.send).not.toBeCalled();
		expect(next).toBeCalled();
	})
});
