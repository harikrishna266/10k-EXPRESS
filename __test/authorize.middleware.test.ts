import authorizedUsersOnly from "../src/middleware/authorized-users-only";

const essentials = (session: any) => {
	const send = jest.fn();
	const req = jest.fn();
	const sendStatus = jest.fn();
	const next = jest.fn();

	const res = {
		locals: session,
		send: jest.fn(),
		status: jest.fn(),
		sendStatus: jest.fn(),
	};

	return {send, next, res, req};
}


describe("Authorize middleware", () => {
	it("If a session variable is not present then send 401", async () => {
		const {req, res, next} = essentials({});
		// @ts-ignore
		await authorizedUsersOnly(req, res, next);
		expect(res.locals.session).toBeUndefined();
		expect(res.send).toBeCalledWith(403)
		expect(next).not.toBeCalled()
	})

	it("If a session variable is  then allow the request to continue", async () => {
		const {req, res, next} = essentials({
			session: 'true'
		});
		// @ts-ignore
		await authorizedUsersOnly(req, res, next);
		expect(res.locals.session).toBeDefined();
		expect(res.send).not.toBeCalled();
		expect(next).toBeCalled();
	})
});
