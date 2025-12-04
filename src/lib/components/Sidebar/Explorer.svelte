<script lang="ts">
	import { onMount } from 'svelte';
	import { sidebar } from '$lib/stores/index.svelte';
	import Folders from './Folders.svelte';

	/** @type {{ isResizing: boolean }} */
	let { isResizing = $bindable() } = $props();

	let minWidth = 200;
	let maxWidth = 900;

	const resize = (e: MouseEvent) => {
		if (!isResizing) return;

		const newWidth = e.clientX;

		if (newWidth >= minWidth && newWidth <= maxWidth) {
			sidebar.width = newWidth;
		}
	};

	const stopResize = () => {
		if (isResizing) {
			isResizing = false;
			document.body.style.userSelect = '';
			document.body.style.cursor = '';
		}
	};

	onMount(() => {
		document.addEventListener('mousemove', resize);
		document.addEventListener('mouseup', stopResize);

		return () => {
			document.removeEventListener('mousemove', resize);
			document.removeEventListener('mouseup', stopResize);
		};
	});
</script>

<div class="flex overflow-hidden">
	<div class="bg-blue-500 overflow-y-scroll flex flex-col" style="width: {sidebar.width}px;">
		<Folders />
	</div>
</div>
