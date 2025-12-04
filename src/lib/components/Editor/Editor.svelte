<script lang="ts">
	import Routes from './Routes.svelte';
	import Pages from './Pages.svelte';
	import Code from './Code.svelte';
	import Preview from './Preview.svelte';

	import { file } from '$lib/stores/index.svelte';
</script>

<div class="flex-1 flex flex-col shrink-0">
	<Pages />
	<Routes />
	{#if file.view === 'code'}
		<Code />
	{/if}
	{#if file.view === 'live'}
		<Preview />
	{/if}
</div>
