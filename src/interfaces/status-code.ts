import {util} from "zod";
import objectKeys = util.objectKeys;

export const codes = {
	UNAUTHORIZED: {
		code: 401,
		response : {"message": "UnAuthorized User"}
	},

	FORM_VALIDATION_ERRORS: {
		code: 400,
		response : {}
	},

	CONFLICT_ERROR: {
		code: 409,
		response : {}
	}

}


