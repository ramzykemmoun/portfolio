<script lang="ts">
	import Navbar from '../lib/components/Navbar/Navbar.svelte';
	import Sidebar from '../lib/components/Sidebar/Sidebar.svelte';
	import Agent from '../lib/components/Agent/Agent.svelte';
	import Editor from '../lib/components/Editor/Editor.svelte';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import WelcomeDialog from '../lib/components/WelcomeDialog.svelte';
</script>

<ThemeToggle />
<ThemeToggle />
<WelcomeDialog />
<div class="flex flex-col h-screen overflow-hidden w-full bg-surface-950 text-surface-200">
	<Navbar />
	<main class="main-content flex flex-1 overflow-hidden">
		<Sidebar />
		<Editor />
		<Agent />
	</main>
</div>

<style>
	@media (max-width: 768px) {
		.main-content {
			flex-direction: column;
		}
	}
</style>
