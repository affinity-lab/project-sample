<script lang="ts">
	import {messengers} from "../messaging/messengers";
	import {Status} from "../messaging/status";

	export let reload: () => void
	let newTask = "";
	const keyup = (event) => {
		if (event.code === "Enter" && newTask !== "") {
			messengers.task.add(newTask)
				.on(Status.OK, () => console.log("Saved"))
				.error((e) => console.log(e))
				.finally(()=>{
					reload();
					newTask = "";
				})
				.send()
		}
	}
</script>
<div class="task">
	<i class="bi-plus-square-dotted"></i>
	<input type="text" bind:value={newTask} placeholder="Create new task" on:keyup={keyup}>
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