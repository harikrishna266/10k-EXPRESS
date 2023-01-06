import * as validator from "../src/middleware/validate-resources";

describe("Authorize middleware", () => {
	it("If form is valid continue request", async () => {
		const next = jest.fn();

		// @ts-ignore
		jest.spyOn(validator, "validate").mockReturnValue(() => {
			next();
		});
		validator.validate('1')(1, 2, next);
		expect(next).toBeCalled();
	})
	it("If form is not valid send error", async () => {
		const mockResponse = () => {
			const res = {};
			// @ts-ignore
			res.status = jest.fn().mockReturnValue(res);
			// @ts-ignore
			res.send = jest.fn().mockReturnValue(res);
			return res;
		};

		// @ts-ignore
		jest.spyOn(validator, "validate").mockReturnValue((a) => {
			try {
				throw new Error();
			} catch(e) {
				a.status(400).send({})
			}
		});
		const mock = mockResponse();
		// @ts-ignore
		validator.validate({})(mock);
		// @ts-ignore
		expect(mock.status).toBeCalled();

		// @ts-ignore
		expect(mock.send).toBeCalled();

	})
});

// @ts-ignore

