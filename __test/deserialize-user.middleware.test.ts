import * as Utils from "../src/utils/jwt.util";
import deserializeUser from "../src/middleware/deserialize-user";
import * as SessionSer from '../src/service/session.service';
import {verifyJwt} from "../src/utils/jwt.util";
import {getSessionById} from "../src/service/session.service";


const verifyJwtFn = (returnValue: any) => {
	return jest
		.spyOn(Utils, "verifyJwt")
		// @ts-ignore
		.mockReturnValue(returnValue);
}

const essentials = (token: string) => {
	const send = jest.fn();
	const sendStatus = jest.fn();
	const next = jest.fn();
	const res = {send, locals: {}, sendStatus}
	const req = {
		header: () => 'Bearer ' + token
	}
	return {send, next, res, req};
}

const spyOnGetSessionById = (returnValue: any) => {
	return jest
		.spyOn(SessionSer, "getSessionById")
		// @ts-ignore
		.mockReturnValue(returnValue);
}


describe("Deserializer", () => {
	it("If there is no token the user session should not be set",
		async () => {
			const {next, res, req} = essentials('');
			const verifyJwt = verifyJwtFn('');
			const getSessionById = spyOnGetSessionById('');
			// @ts-ignore
			await deserializeUser(req, res, next);
			expect(verifyJwt).not.toHaveBeenCalled()

			expect(res.locals).toBeUndefined();
			expect(res.locals).toBeUndefined();
			expect(getSessionById).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalled();
		})

	it("if token is valid and set the session property in locals", async () => {
		const {next, res, req} = essentials('1234567');
		const verifyJwt = verifyJwtFn({valid: true, expired: false, decoded: 1});
		const getSessionById = spyOnGetSessionById({user: 1, id: 1})
		// @ts-ignore
		await deserializeUser(req, res, next);
		// @ts-ignore
		expect(verifyJwt).toHaveBeenCalled();
		expect(getSessionById).toHaveBeenCalled();
		// @ts-ignore
		expect(res.locals.session).toEqual({userId: 1, sessionId: 1});
		expect(verifyJwt).toHaveBeenCalled()
		expect(next).toHaveBeenCalled();
	})

	it("If token is expired it should send a 401 ", async () => {
		const {next, res, req} = essentials('1234567');
		const verifyJwt = verifyJwtFn({valid: true, expired: true, decoded: 1});
		const getSessionById = spyOnGetSessionById({user: 1, id: 1})

		// @ts-ignore
		await deserializeUser(req, res, next);
		// @ts-ignore
		expect(verifyJwt).toHaveBeenCalled();
		expect(res.sendStatus).toHaveBeenCalledWith(401);
		// @ts-ignore
		expect(getSessionById).not.toHaveBeenCalled();
		// @ts-ignore
		expect(res.locals.session).toBeUndefined();
		expect(next).not.toHaveBeenCalled();

	})

});
