import {MessageID} from "./message-id";
import {MessageResult, Messenger} from "@affinity-lab/sk-messaging";

export const messenger = (data: any, messageId: number): Messenger => new Messenger(
	data,
	"/message",
	messageId,
	(res: MessageResult) => res.isHandled ? false : console.log(res)
);

export const messengers = {
	task: {
		add: (name: string) => messenger({name}, MessageID.ADD_NEW_TASK),
		save: (id: number, status: boolean, name: string) => messenger({id, status, name}, MessageID.SAVE_TASK),
		remove: (id: number) => messenger({id}, MessageID.REMOVE_TASK),
		get: () => messenger({}, MessageID.GET_TASKS),
		reorder: (id: number, sequence: number) => messenger({id, sequence}, MessageID.REORDER_TASK),
		upload: (id:number, file:File)=> messenger({id, file}, MessageID.UPLOAD_TASK_IMAGE)
	},
	tag:{
		get: ()=>messenger({}, MessageID.GET_TAGS)
	}
};