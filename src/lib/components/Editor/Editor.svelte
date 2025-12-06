<script lang="ts">
	import Routes from './Routes.svelte';
	import Pages from './Pages.svelte';
	import Code from './Code.svelte';
	import Preview from './Preview.svelte';
	import Terminal from '../Terminal/Terminal.svelte';
	import { Terminal as TerminalIcon } from '@lucide/svelte';
	import { file, terminal } from '$lib/stores/index.svelte';

	let editorHeight = $state(70);
	let isResizing = $state(false);
	let containerRef: HTMLDivElement;

	const startResize = (e: MouseEvent) => {
		e.preventDefault();
		isResizing = true;

		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef) return;
			const rect = containerRef.getBoundingClientRect();
			const newHeight = ((e.clientY - rect.top) / rect.height) * 100;
			editorHeight = Math.min(Math.max(newHeight, 20), 90);
		};

		const handleMouseUp = () => {
			isResizing = false;
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	const closeTerminal = () => {
		terminal.open = false;
	};

	const openTerminal = () => {
		terminal.open = true;
	};
</script>

<div class="editor-container" bind:this={containerRef}>
	<!-- Editor Section -->
	<div class="editor-section" style="height: {terminal.open ? editorHeight + '%' : '100%'}">
		<Pages />
		<Routes />
		<div class="editor-content">
			{#if file.view === 'code'}
				<Code />
			{/if}
			{#if file.view === 'live'}
				<Preview />
			{/if}
		</div>
	</div>

	{#if terminal.open}
		<div
			class="resize-handle"
			class:active={isResizing}
			onmousedown={startResize}
			role="separator"
			tabindex="0"
			aria-label="Resize"
		></div>

		<div class="terminal-section" style="height: calc({100 - editorHeight}% - 4px)">
			<Terminal onclose={closeTerminal} />
		</div>
	{:else}
		<button class="terminal-toggle" onclick={openTerminal} title="Open Terminal">
			<TerminalIcon class="w-4 h-4" />
			<span>Terminal</span>
		</button>
	{/if}
</div>

<style>
	.editor-container {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
		min-height: 0;
		overflow: hidden;
	}

	.editor-section {
		display: flex;
		flex-direction: column;
		min-height: 100px;
		overflow: hidden;
	}

	.editor-content {
		flex: 1;
		min-height: 0;
		overflow: auto;
	}

	.resize-handle {
		height: 4px;
		background: #252526;
		cursor: ns-resize;
		flex-shrink: 0;
		transition: background 0.15s ease;
	}

	.resize-handle:hover,
	.resize-handle.active {
		background: #007acc;
	}

	.terminal-section {
		min-height: 35px;
		overflow: hidden;
	}

	.terminal-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		height: 28px;
		padding: 0 12px;
		background: #252526;
		border: none;
		border-top: 1px solid #1e1e1e;
		color: #858585;
		font-size: 12px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.terminal-toggle:hover {
		background: #2a2a2a;
		color: #cccccc;
	}
</style>
