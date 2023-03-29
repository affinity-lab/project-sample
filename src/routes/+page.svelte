<script lang="ts">
	import Task from "$lib/components/task.svelte"
	import Tag from "$lib/components/tag.svelte"
	import AddTask from "$lib/components/add-task.svelte"

	import {tasks} from "../lib/task";
	import {tags} from "../lib/tag";
	import {messengers} from "../lib/messaging/messengers";
	import {Status} from "../lib/messaging/status";

	export let data;
	tasks.set(data.tasks)
	tags.set(data.tags)

	const reload = () => {
		messengers.task.get()
			.on(Status.OK, (res) => tasks.set(res.message.tasks))
			.send()
		messengers.tag.get()
			.on(Status.OK, (res) => tags.set(res.message.tags))
			.send()
	}
</script>

<section>
	<div class="tags">
		{#each $tags as tag (tag.tag)}
			<Tag>{tag.tag}</Tag>
		{/each}
	</div>

	{#each $tasks as task (task.id)}
		<Task {task} {reload}/>
	{/each}
	<AddTask {reload}/>
</section>

<style lang="scss">
	section {
		margin: 30px;
		.tags{
			display: block;
			margin-bottom: 30px;
			clear: both;
		}
	}
</style>