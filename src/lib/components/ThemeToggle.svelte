<script lang="ts">
	import { config } from '$lib/stores/index.svelte';

	let checked = $state(false);

	$effect(() => {
		config.theme;

		const mode = localStorage.getItem('theme') || config.theme;
		console.log({ mode });

		document.documentElement.setAttribute('data-theme', mode);
	});
</script>

<svelte:head>
	<script>
		const mode = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', mode);
	</script>
</svelte:head>
