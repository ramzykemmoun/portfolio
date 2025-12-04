<script lang="ts">
	import { section } from '$lib/stores/section.svelte';
	import { onMount } from 'svelte';

	/** @type {{ isResizing: boolean, sidebarWidth: number }} */
	let { isResizing = $bindable(), sidebarWidth = $bindable() } = $props();

	let minWidth = 150;
	let maxWidth = 1600;

	const resize = (e: MouseEvent) => {
		if (!isResizing) return;

		const newWidth = e.clientX;

		if (newWidth >= minWidth && newWidth <= maxWidth) {
			sidebarWidth = newWidth;
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
	<div class="bg-blue-500 overflow-y-scroll flex flex-col" style="width: {sidebarWidth}px;">
		<p>Slm {section.tag}</p>
	</div>
</div>
