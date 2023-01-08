

export interface IUserDocument extends IUser {
 	isModified: () => boolean;
	comparePassword: (pass: string) => Promise<boolean>;
	getUserDetails: (a: any) =>  Promise<any>
}

export interface IUser {
	name: string;
	password: string;
	email: string;
}
