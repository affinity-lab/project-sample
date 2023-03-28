<script lang="ts">
	import Task from "$lib/components/task.svelte"
	import AddTask from "$lib/components/add-task.svelte"

	import {tasks} from "../lib/task";
	import {messengers} from "../lib/messaging/messengers";
	import {Status} from "../lib/messaging/status";

	export let data;
	tasks.set(data.tasks)

	const reload = () => {
		messengers.task.get()
			.on(Status.OK, (res) => {
				tasks.set(res.message.tasks);
			})
			.send()
	}
</script>

<section>
	{#each $tasks as task}
		<Task {task} {reload}/>
	{/each}
	<AddTask {reload}/>

</section>

<style lang="scss">
	section {
		margin: 30px;
	}
</style>