<script lang="ts">
	import type {Task} from "../task";
	import {messengers} from "../messaging/messengers";
	import {Status} from "../messaging/status";
	import {toast} from "@zerodevx/svelte-toast";
	import {fileUrlProvider} from "$lib/services/file-url-provider.js";
	import {dragAndDrop} from "../component-actions/drag-and-drop";

	export let task: Task;
	export let reload: () => void;

	const changeStatus = () => {
		task.status = !task.status;
		save();
	}
	const save = () => {
		messengers.task.save(task.id, task.status, task.name)
			.on(Status.OK, () => toast.push('Task saved'))
			.finally(reload)
			.send();
	}
	const remove = () => {
		messengers.task.remove(task.id).on(Status.OK, () => true)
			.on(Status.OK, () => toast.push('Task removed'))
			.finally(reload)
			.send();
	}

	function uploadImage(event) {
		messengers.task.upload(task.id, event.target.files[0])
			.finally(reload)
			.send()
	}

	function reorder(id: number, to: number) {
		messengers.task.reorder(id, to)
			.on(Status.OK, () => toast.push('Task saved'))
			.finally(reload)
			.send();
	}
</script>


<main use:dragAndDrop={{grip:"i.grip", reorder:reorder}}
		data-id={task.id}
		data-sequence={task.sequence}
		class:drag-over={false}
>
	<i class="insert bi-arrow-right-short"></i>
	<i class="grip bi-grid-3x2-gap"></i>
	<i class:bi-check-square={task.status} class:bi-square={!task.status} on:click={changeStatus}></i>
	{#if task.img !== undefined && task.img !== null}
		<img src={fileUrlProvider.img(task.img, 24,24).x2.webp}>
	{/if}
	<input type="text" bind:value={task.name} on:change={save}>
	<label>
		<input name="upload" on:change={uploadImage} type="file" hidden accept="image/*">
		<i class="browse bi-image"></i>
	</label>
	<i class="remove bi-x" on:click={remove}></i>
</main>

<style lang="scss">
	main {
		display: flex;
		padding: 5px;
		border-radius: 3px;
		transition: all .3s;

		&.drag-over {
			i.insert {display: inline-block;}
			i.grip { display: none;}
		}
		i.insert {display: none;}
		&:hover {
			background-color: #0002;
			.grip, .remove, .browse { opacity: 1;}
		}
		i.grip {cursor: grab}

		img {
			width: 24px;
			height: 24px;
			border-radius: 12px;
		}

		.bi-check-square {color: #48E148;}

		.grip, .remove, .browse {
			transition: all .3s;
			opacity: .1;
		}


		i {
			margin-right: 5px;
			cursor: pointer;
		}

		input {
			padding: 2px 5px;
			flex-grow: 1;
			border: 0;
			background: transparent;
			color: white;
			outline: none;
		}
	}
</style>