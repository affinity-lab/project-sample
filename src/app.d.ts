// See https://kit.svelte.dev/docs/types#app
// for information sign-in.ts these interfaces
// and what to do when importing types


declare namespace App {
	// interface Error {}
	import type {NeptunUser} from "@affinity-lab/sk-mik-id-sso-client";
	export type SessionData = undefined | {
		[p: string]: any,
		user?: NeptunUser
	}
	interface Locals {session: SessionData;}
	interface PageData {session: SessionData;}
	// interface Platform {}
}
