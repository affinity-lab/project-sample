// See https://kit.svelte.dev/docs/types#app
// for information sign-in.ts these interfaces
// and what to do when importing types



declare namespace App {
	// interface Error {}
	import type {SessionType} from "./lib/session-type";
	interface Locals {session: SessionType;}
	interface PageData {session: SessionType;}
	// interface Platform {}
}
