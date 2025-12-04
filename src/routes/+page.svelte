<script lang="ts">
	import Navbar from '../lib/components/Navbar/Navbar.svelte';
	import Sidebar from '../lib/components/Sidebar/Sidebar.svelte';
	import Agent from '../lib/components/Agent/Agent.svelte';
	import Editor from '../lib/components/Editor/Editor.svelte';
</script>

<div class="flex flex-col h-screen overflow-hidden w-full">
	<Navbar />
	<main class="flex flex-1 h-full">
		<Sidebar />
		<Editor />
		<Agent />
	</main>
</div>
