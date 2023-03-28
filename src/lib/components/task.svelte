<script lang="ts">
	import type {Task} from "../task";
	import {messengers} from "../messaging/messengers";
	import {Status} from "../messaging/status";

	export let task: Task;
	export let reload: ()=>void;

	const changeStatus = () => {
		task.status = !task.status;
		save();
	}
	const save = () => {
		messengers.task.save(task.id, task.status, task.name)
			.finally(reload)
			.send();
	}
	const remove = () => {
		messengers.task.remove(task.id).on(Status.OK, () => true)
			.finally(reload)
			.send();
	}

</script>
<div class="task">
	<i class:bi-check-square={task.status} class:bi-square={!task.status} on:click={changeStatus}></i>
	<input type="text" bind:value={task.name} on:change={save}>
	<i class="bi-x" on:click={remove}></i>
</div>

<style lang="scss">
	div.task {
		display: flex;
		padding: 5px;
		border-radius: 3px;

		&:hover {
			background-color: #0002;
		}

		i {
			margin-right: 5px;
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