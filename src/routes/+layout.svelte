<script lang="ts">
	import "../app.scss"
	import "bootstrap-icons/font/bootstrap-icons.scss"
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";
	import { SvelteToast } from '@zerodevx/svelte-toast'

	export let data;
</script>
<SvelteToast />
<main>
	<Header session={data.session}/>
	<section>
		<slot/>
	</section>
	<Footer/>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		height: 100%;
		section {flex-grow: 1;}
	}
</style>