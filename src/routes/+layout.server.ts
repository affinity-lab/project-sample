import type {RequestEvent} from "@sveltejs/kit";
import {Task} from "../entities/task";
import {Tags} from "../entities/tags";

/** @type {import('../../../.svelte-kit/types/src/routes').PageServerLoad} */
export async function load(event: RequestEvent) {

	let data = {
		tasks: await Task.export(Task.find()),
		tags: await Tags.export(Tags.findTags(null))
	};
	return data;
}

