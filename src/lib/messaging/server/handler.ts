import type {RequestEvent} from "@sveltejs/kit";
import {handler, respond, ServerTypes} from "@affinity-lab/sk-messaging";
import {MessageID} from "../message-id";
import {reform} from "reformdata";
import {Status} from "../status";
import {Task} from "../../../entities/task";
import {Tags} from "../../../entities/tags";
import * as fs from "fs";
import path from "path";


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
	return respond(Status.OK, {tasks: await Task.export(await Task.find())});
}
handlers[MessageID.SAVE_TASK] = async (event, formData) => {
	let data = reform<{ id: string, status: string, name: string }>(formData);

	let id = parseInt(data.id);
	let status = data.status === "true";
	let name = data.name;
	let task = await Task.pick(id);
	task.status = status;
	task.name = name;
	await task.save()
	return respond(Status.OK);
}

handlers[MessageID.UPLOAD_TASK_IMAGE] = async (event, formData) => {
	let data = reform<{ id: string, file: File }>(formData);
	let id = parseInt(data.id);
	let file = data.file;
	let filePath = path.resolve("data/tmp/", file.name);
	fs.writeFileSync(filePath, new DataView(await file.arrayBuffer()))
	let task = await Task.pick(id);
	await task.image.replace(filePath);
	fs.unlinkSync(filePath);
	return respond(Status.OK);
}

handlers[MessageID.REORDER_TASK] = async (event, formData) => {
	let data = reform<{ id: string, sequence: string }>(formData);
	let id = parseInt(data.id);
	let sequence = parseInt(data.sequence);
	let task = await Task.pick(id);
	task.sequence = sequence;
	await task.save();
	return respond(Status.OK, `Task reordered`);
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

handlers[MessageID.GET_TAGS] = async (event) => {
	return respond(Status.OK, {tags: await Tags.export(Tags.findTags(null))});
}

export const messageHandler = (event: RequestEvent) => handler(event, handlers);