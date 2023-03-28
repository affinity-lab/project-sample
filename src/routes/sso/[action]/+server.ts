import type {RequestEvent} from '@sveltejs/kit';
import {error} from "@sveltejs/kit";
import {ssoClient} from "$lib/services/sso-client";

export async function GET(event: RequestEvent) {
	switch (event.params["action"]) {
		case "sign-in":
			return ssoClient.signIn(event, event.url.origin + "/sso/authenticated");
		case "authenticated":
			return ssoClient.authenticated(event, event.url.origin, event.url.origin);
		case "sign-out":
			return ssoClient.signOut(event, event.url.origin);
	}
	throw error(404, {message: 'Not found'});
}