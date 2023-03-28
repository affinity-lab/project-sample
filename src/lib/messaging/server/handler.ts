import type {RequestEvent} from "@sveltejs/kit";
import {handler, respond, ServerTypes} from "@affinity-lab/sk-messaging";
import {MessageID} from "../message-id";
import {reform} from "reformdata";
import {Status} from "../status";
import {Task} from "../../../entities/task";


const handlers: ServerTypes.MessageHandlerCollection = {};

handlers[MessageID.ADD_NEW_TASK] = async (event, formData) => {
	let data = reform<{ name: string }>(formData);

	let task = Task.create();
	task.name = data.name;
	task.status = false;

	try {
		await task.save();
		return respond(Status.OK, `Task saved`);
	} catch (e) {
		return respond(Status.ERROR, e)
	}
}

handlers[MessageID.GET_TASKS] = async (event) => {
	return respond(Status.OK, {tasks: (await Task.find()).map((t) => t.export())});
}
handlers[MessageID.SAVE_TASK] = async (event, formData) => {
	let data = reform<{ id: string, status:string, name:string }>(formData);

	let id = parseInt(data.id);
	let status = data.status === "true";
	let name = data.name;
	let task = await Task.pick(id);
	task.status = status;
	task.name = name;
	await task.save()
	return respond(Status.OK);
}

handlers[MessageID.REMOVE_TASK] = async (event, formData) => {
	let data = reform<{ id: string }>(formData);
	let task = await Task.pick(parseInt(data.id));
	try {
		await task.remove();
		return respond(Status.OK, `Task deleted`);
	} catch (e) {
		return respond(Status.ERROR, e)
	}
}

export const messageHandler = (event: RequestEvent) => handler(event, handlers);