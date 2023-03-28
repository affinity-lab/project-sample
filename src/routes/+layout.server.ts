import type {RequestEvent} from "@sveltejs/kit";
import {Task} from "../entities/task";

/** @type {import('../../../.svelte-kit/types/src/routes').PageServerLoad} */
export async function load(event: RequestEvent) {
	let tasks = await Task.find()
	let data = {
		tasks: tasks.map(task => task.export())
	};
	return data;
}

