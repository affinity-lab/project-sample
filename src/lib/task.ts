import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

export type Task = {
	id:number
	name: string
	status: boolean
	sequence: number
	img:{}
}

export let tasks:Writable<Array<Task>> = writable([]);