import "reflect-metadata"
import type {Handle, RequestEvent} from "@sveltejs/kit";
import {sessionManager} from "./lib/services/session-manager";
import {carbonite} from "./entities/setup/carbonite";

let dataSource = await carbonite();
process.on('uncaughtException', (err)=>console.log('Caught exception: ' + err));
process.on('exit', () => dataSource.destroy())

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}: { event: RequestEvent, resolve: any }) {
	sessionManager.handleRequest(event);
	let response = await resolve(event);
	sessionManager.update(event);
	return response;
}