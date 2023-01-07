import  * as validator from "../../src/middleware/validate-resources";
import {nextMock as next, reqMock as req, resMock as res} from "../reqMock";
import {NextFunction, Request, Response} from "express";
import {codes} from "../../src/interfaces/status-code";

const schema = {
	parse: jest.fn()
}
describe("Validate Resources middleware", () => {
	let parse: any;
	beforeEach(() => {
		jest.spyOn(res, 'status');
		jest.spyOn(res, 'send');
 	})

	describe("INVALID", () => {
		let error: any;
		beforeEach(() => {
			error = jest.spyOn(schema, 'parse').mockImplementation(() =>  {throw new Error('errors')});
		})

		it('throw form validation error' , () =>{
			validator.validate(schema)(req, res, next);
			expect(res.status).toHaveBeenCalledWith(codes.FORM_VALIDATION_ERRORS.code);
			expect(res.send).toHaveBeenCalledTimes(1);
			expect(next).not.toHaveBeenCalled();
		})

	})
	describe("VALID", () => {
		let error: any;
		beforeEach(() => {
			error = jest.spyOn(schema, 'parse').mockReturnValue(true);
		})

		it('continue request' , () =>{
			validator.validate(schema)(req, res, next);
			expect(res.status).not.toHaveBeenCalled()
			expect(res.send).not.toHaveBeenCalled()
		})

	})

});




const validFormData = (schema: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		return true
	}
}

