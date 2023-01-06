import {object, string} from "zod";


export const ZodUserLoginSchema = object({
	body: object({
		email: string({
			required_error: 'Please enter a valid email'
		}),
		password: string({
			required_error: 'Please enter a valid password'
		}).min(6, 'Password too short'),
	})
});

export const ZodUserRegisterSchema = object({
	body: object({
		name: string({
			required_error: 'Name is required'
		}),
		password: string({
			required_error: 'password is required'
		}).min(6, 'Password too short'),
		confirm_password: string({
			required_error: 'password is required'
		}),
		email: string({
			required_error: 'email is required'
		}).email('Invalid Email'),
	}).refine((data) => data.password === data.confirm_password, {
		message: 'Passwords does not match', path: ['passwordConfirmation']
	})
});
