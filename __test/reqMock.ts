import {NextFunction, Request, Response} from "express";

type sendData = {
	message: any
}

//@ts-ignore
export const resMock = {
	status:  (code: number) => {
		return resMock
	},
	send:  (data: sendData) => {
		return resMock
	},
	locals: {
		session: undefined
	}
} as Response ;

//@ts-ignore
export const  reqMock = {

} as Request

export const nextMock = jest.fn() as NextFunction
