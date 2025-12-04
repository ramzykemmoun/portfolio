<script lang="ts">
	import Navbar from '../lib/components/Navbar/Navbar.svelte';
	import Sidebar from '../lib/components/Sidebar/Sidebar.svelte';
	import Agent from '../lib/components/Agent/Agent.svelte';
	import Editor from '../lib/components/Editor/Editor.svelte';
</script>

<div class="flex flex-col h-screen">
	<Navbar />
	<main class="flex h-full">
		<Sidebar />
		<Editor />
		<Agent />
	</main>
</div>
