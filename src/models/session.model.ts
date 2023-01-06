import mongoose, {Schema} from "mongoose";

const SessionSchemaConfig = {
	user: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	valid: { type: Boolean, default: true},
	userAgent: { type: String},
	createdAt: { type: Date, default:() =>  Date.now(), immutable: true},
	updateAt: {type: Date, default:() =>  Date.now()}
};

const sessionsSchema: Schema = new Schema(SessionSchemaConfig);


const SessionModel = mongoose.model('Session', sessionsSchema);
export default SessionModel

export interface ISession {
	user: mongoose.Schema.Types.ObjectId;
	valid: boolean;
	userAgent: string;
	password: string;
}
export interface ISessionDocument extends ISession, mongoose.Document{
	createdAt: Date;
	updateAt: Date;

}

