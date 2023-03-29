import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

export type Tag = {
	tag: string
}

export let tags:Writable<Array<Tag>> = writable([]);