import {nextMock as next, reqMock as req, resMock as res} from "./reqMock";
import * as UserSer from "../src/service/user.service";
import * as UserCont from "../src/controller/user.controller";
import {Conflict} from "../src/utils/error-handler/error.classes";
jest.mock("../src/service/user.service");

describe('User Controller methods', () => {

	let createNewUser: any;
	let userSerSpy: any;
	let getUserByEmail: any;
	beforeEach(() => {
		jest.spyOn(res, 'status');
		jest.spyOn(res, 'send');

	})

	describe('User Registration', () => {
		describe("Valid Form submit-should register User", () => {
			describe('Check if the email id is Duplicate', () => {
				let emailNoDuplicate: any;
				let createNewUser: any;

				describe('NOT DUPLICATE Email',  () => {
					beforeEach(() => {
						req.body = {name: 'valid', email: 'email@gmail.com'}
						getUserByEmail = jest.spyOn(UserSer, "getUserByEmail").mockImplementationOnce( (): Promise<any> => Promise.resolve(0));
						createNewUser = jest.spyOn(UserSer, "createNewUser").mockImplementationOnce( (): Promise<any> => Promise.resolve({_id:1, email:1, name:1}));
					})
					it('should save the form', async () => {
						await UserCont.createUser(req, res, next);
						expect(getUserByEmail).toBeCalledWith('email@gmail.com')
						expect(createNewUser).toBeCalledWith(req.body)
						expect(res.send).toBeCalledWith({_id:1, email:1, name:1})
					})
				})

				describe('DUPLICATE Email',  () => {
					beforeEach(() => {
						req.body = {name: 'valid', email: 'email@gmail.com'}
						getUserByEmail = jest.spyOn(UserSer, "getUserByEmail").mockImplementationOnce( (): Promise<any> => Promise.resolve(1));
						createNewUser = jest.spyOn(UserSer, "createNewUser").mockImplementationOnce( (): Promise<any> => Promise.resolve({_id:1, email:1, name:1}));
					})
					it('should save the form', async () => {
						await UserCont.createUser(req, res, next);
						expect(getUserByEmail).toBeCalledWith('email@gmail.com')
						expect(createNewUser).not.toBeCalledWith(req.body)
						expect(next).toBeCalledWith(new Conflict({message: 'Email already taken'}))
					})
				})
			})
		});
	})
});
