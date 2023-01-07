export const STATUS_CODES = {
	SUCCESS :  200,
	CREATED : 201,
	BAD_REQUEST: 400,
	CONFLICT: 409,
	UNAUTHORIZED : 401,
	FORBIDDEN : 403,
	NOTFOUND : 404,
	INTERNAL_SERVER_ERROR : 500
} as const;

export type CODES = keyof  typeof STATUS_CODES;

export interface BaseError {
	messages : string[] | { message: string };
	httpStatus: CODES
}
