<script lang="ts">
	import Navbar from '../lib/components/Navbar/Navbar.svelte';
	import Sidebar from '../lib/components/Sidebar/Sidebar.svelte';
	import Agent from '../lib/components/Agent/Agent.svelte';
	import Editor from '../lib/components/Editor/Editor.svelte';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
</script>

<ThemeToggle />
<ThemeToggle />
<div class="flex flex-col h-screen overflow-hidden w-full bg-surface-950 text-surface-200">
	<Navbar />
	<main class="main-content flex flex-1 overflow-hidden">
		<Sidebar />
		<Editor />
		<Agent />
	</main>
</div>

<style>
	/* Responsive: Mobile */
	@media (max-width: 768px) {
		.main-content {
			/* Ensure full width without sidebar taking space */
			flex-direction: column;
		}
	}
</style>
