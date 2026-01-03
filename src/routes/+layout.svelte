<script lang="ts">
	import './layout.css';
	import icon from '$lib/assets/logos/rk-icon.png';

	let { children } = $props();

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<svelte:head>
	<link rel="icon" href={icon} />
	<title>Ramzy KEMMOUN - Portfolio</title>
</svelte:head>

{@render children()}
