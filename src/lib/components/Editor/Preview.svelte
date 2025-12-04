<script lang="ts">
	import { file } from '$lib/stores/index.svelte';

	import AboutMe from './Sections/AboutMe.svelte';
	import Education from './Sections/Education.svelte';
	import Experiences from './Sections/Experiences.svelte';
	import Projects from './Sections/Projects.svelte';
	import Skills from './Sections/Skills.svelte';
</script>

{#if file.section === 'aboutMe'}
	<AboutMe />
{/if}

{#if file.section === 'education'}
	<Education />
{/if}

{#if file.section === 'experiences'}
	<Experiences />
{/if}

{#if file.section === 'projects'}
	<Projects />
{/if}

{#if file.section === 'skills'}
	<Skills />
{/if}
