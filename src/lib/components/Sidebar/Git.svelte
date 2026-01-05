<script lang="ts">
	import { onMount } from 'svelte';
	import { sidebar } from '$lib/stores/index.svelte';
	import {
		GitBranch,
		GitCommit,
		GitPullRequest,
		ArrowDown,
		ArrowUp,
		RefreshCw,
		Plus,
		Check,
		Clock,
		User
	} from '@lucide/svelte';

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

	const commits = [
		{
			hash: 'a3f7c2d',
			message: 'feat: Add new portfolio sections',
			author: 'Ramzy KEMMOUN',
			time: '2 hours ago',
			branch: 'main',
			color: 'var(--color-primary-500)',
			isMerge: false
		},
		{
			hash: 'b8e1f4a',
			message: 'fix: Update SearchDialog to VS Code style',
			author: 'Ramzy KEMMOUN',
			time: '3 hours ago',
			branch: 'main',
			color: 'var(--color-primary-500)',
			isMerge: false
		},
		{
			hash: 'c2d9e7b',
			message: 'Merge branch feature/skills into main',
			author: 'Ramzy KEMMOUN',
			time: '5 hours ago',
			branch: 'main',
			color: 'var(--color-primary-500)',
			isMerge: true
		},
		{
			hash: 'f5a3c1e',
			message: 'feat: Implement Skills section with animations',
			author: 'Ramzy KEMMOUN',
			time: '6 hours ago',
			branch: 'feature/skills',
			color: 'var(--color-tertiary-500)',
			isMerge: false
		},
		{
			hash: 'd7b2e8f',
			message: 'fix: Terminal resize behavior',
			author: 'Ramzy KEMMOUN',
			time: '1 day ago',
			branch: 'main',
			color: 'var(--color-primary-500)',
			isMerge: false
		},
		{
			hash: 'e9c4f2a',
			message: 'feat: Add Experiences section Japanese theme',
			author: 'Ramzy KEMMOUN',
			time: '2 days ago',
			branch: 'main',
			color: 'var(--color-primary-500)',
			isMerge: false
		},
		{
			hash: 'g1h5i9j',
			message: 'chore: Update dependencies',
			author: 'Ramzy KEMMOUN',
			time: '3 days ago',
			branch: 'main',
			color: 'var(--color-primary-500)',
			isMerge: false
		}
	];

	const branches = [
		{ name: 'main', current: true, ahead: 0, behind: 0 },
		{ name: 'feature/contact', current: false, ahead: 3, behind: 1 },
		{ name: 'feature/skills', current: false, ahead: 0, behind: 2 }
	];

	let selectedBranch = $state('main');
	let showBranchDropdown = $state(false);
</script>

<div class="git-panel" style="width: {sidebar.width}px;">
	<div class="git-header">
		<div class="header-title">
			<GitBranch class="w-4 h-4" />
			<span>SOURCE CONTROL</span>
		</div>
		<div class="header-actions">
			<button class="action-btn" title="Refresh">
				<RefreshCw class="w-4 h-4" />
			</button>
			<button class="action-btn" title="Commit">
				<Check class="w-4 h-4" />
			</button>
		</div>
	</div>

	<div class="branch-selector">
		<button class="branch-btn" onclick={() => (showBranchDropdown = !showBranchDropdown)}>
			<GitBranch class="w-4 h-4 text-primary" />
			<span class="branch-name">{selectedBranch}</span>
			<span class="branch-status">✓ synced</span>
		</button>

		{#if showBranchDropdown}
			<div class="branch-dropdown bg-surface-800">
				{#each branches as branch}
					<button
						class="branch-option"
						class:active={branch.name === selectedBranch}
						onclick={() => {
							selectedBranch = branch.name;
							showBranchDropdown = false;
						}}
					>
						<GitBranch class="w-3 h-3" />
						<span>{branch.name}</span>
						{#if branch.current}
							<span class="current-badge">current</span>
						{/if}
						{#if branch.ahead > 0 || branch.behind > 0}
							<span class="sync-status">
								{#if branch.ahead > 0}↑{branch.ahead}{/if}
								{#if branch.behind > 0}↓{branch.behind}{/if}
							</span>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<div class="git-actions">
		<button class="git-action-btn">
			<ArrowDown class="w-4 h-4" />
			<span>Pull</span>
		</button>
		<button class="git-action-btn">
			<ArrowUp class="w-4 h-4" />
			<span>Push</span>
		</button>
		<button class="git-action-btn">
			<RefreshCw class="w-4 h-4" />
			<span>Fetch</span>
		</button>
		<button class="git-action-btn">
			<GitPullRequest class="w-4 h-4" />
			<span>PR</span>
		</button>
	</div>
	<div class="commit-input-section">
		<input type="text" placeholder="Message (Ctrl+Enter to commit)" class="commit-input" />
		<button class="commit-btn">
			<Check class="w-4 h-4" />
		</button>
	</div>
	<div class="changes-section">
		<div class="section-header">
			<span>Changes</span>
			<span class="change-count">0</span>
		</div>
		<div class="no-changes">
			<Check class="w-5 h-5" />
			<span>No changes to commit</span>
		</div>
	</div>
	<div class="graph-section">
		<div class="section-header">
			<span>Commit History</span>
			<span class="commit-count">{commits.length}</span>
		</div>

		<div class="commit-graph">
			{#each commits as commit, i}
				<div class="commit-row">
					<div class="graph-line">
						<div class="line-segment" style="background: {commit.color};">
							{#if i > 0}
								<div class="line-connector top" style="background: {commits[i - 1].color};"></div>
							{/if}
							{#if i < commits.length - 1}
								<div class="line-connector bottom" style="background: {commit.color};"></div>
							{/if}
						</div>
						<div
							class="commit-dot"
							class:merge={commit.isMerge}
							style="border-color: {commit.color}; background: {commit.isMerge
								? commit.color
								: 'transparent'};"
						>
							{#if commit.isMerge}
								<GitCommit class="w-3 h-3 text-black" />
							{/if}
						</div>
					</div>
					<div class="commit-info">
						<div class="commit-header">
							<span class="commit-hash">{commit.hash}</span>
							<span class="commit-branch" style="color: {commit.color};">{commit.branch}</span>
						</div>
						<div class="commit-message">{commit.message}</div>
						<div class="commit-meta">
							<User class="w-3 h-3" />
							<span>{commit.author}</span>
							<Clock class="w-3 h-3" />
							<span>{commit.time}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.git-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--color-surface-900);
		color: var(--color-surface-200);
		font-size: 12px;
		overflow: hidden;
	}

	.git-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		border-bottom: 1px solid var(--color-surface-800);
		background: rgba(255, 255, 255, 0.02);
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--color-primary-500);
	}

	.header-actions {
		display: flex;
		gap: 4px;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		background: transparent;
		border: none;
		border-radius: 4px;
		color: var(--color-surface-500);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-surface-200);
	}

	.branch-selector {
		position: relative;
		padding: 8px 12px;
		border-bottom: 1px solid var(--color-surface-800);
	}

	.branch-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 12px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 6px;
		color: var(--color-surface-200);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.branch-btn:hover {
		border-color: var(--color-primary-500);
	}

	.branch-name {
		flex: 1;
		text-align: left;
		font-weight: 500;
	}

	.branch-status {
		font-size: 10px;
		color: var(--color-primary-500);
		background: rgba(0, 0, 0, 0.2);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.branch-dropdown {
		position: absolute;
		top: 100%;
		left: 12px;
		right: 12px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 6px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
		z-index: 50;
		overflow: hidden;
	}

	.branch-option {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 12px;
		background: transparent;
		border: none;
		color: var(--color-surface-200);
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.text-primary {
		color: var(--color-primary-500);
	}

	.branch-option:hover,
	.branch-option.active {
		background: rgba(255, 255, 255, 0.1);
	}

	.current-badge {
		font-size: 9px;
		color: var(--color-primary-500);
		background: rgba(0, 0, 0, 0.2);
		padding: 1px 5px;
		border-radius: 3px;
		margin-left: auto;
	}

	.sync-status {
		font-size: 10px;
		color: var(--color-warning-500);
		margin-left: auto;
	}

	.git-actions {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 6px;
		padding: 12px;
		border-bottom: 1px solid var(--color-surface-800);
	}

	.git-action-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 10px 6px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-800);
		border-radius: 6px;
		color: var(--color-surface-400);
		font-size: 10px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.git-action-btn:hover {
		background: var(--color-surface-700);
		border-color: var(--color-primary-500);
		color: var(--color-primary-500);
	}

	.commit-input-section {
		display: flex;
		gap: 8px;
		padding: 12px;
		border-bottom: 1px solid var(--color-surface-800);
	}

	.commit-input {
		flex: 1;
		padding: 10px 12px;
		background: var(--color-surface-800);
		border: 1px solid var(--color-surface-700);
		border-radius: 6px;
		color: var(--color-surface-200);
		font-size: 12px;
		outline: none;
		transition: border-color 0.15s ease;
	}

	.commit-input::placeholder {
		color: var(--color-surface-400);
	}

	.commit-input:focus {
		border-color: var(--color-primary-500);
	}

	.commit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		background: var(--color-primary-500);
		border: none;
		border-radius: 6px;
		color: var(--color-surface-900);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.commit-btn:hover {
		background: var(--color-primary-600);
	}

	.changes-section {
		padding: 12px;
		border-bottom: 1px solid var(--color-surface-800);
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--color-primary-500);
	}

	.change-count,
	.commit-count {
		font-size: 10px;
		background: var(--color-surface-800);
		padding: 2px 8px;
		border-radius: 10px;
	}

	.no-changes {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 16px;
		color: var(--color-primary-500);
		background: var(--color-surface-800);
		border-radius: 6px;
		font-size: 11px;
	}

	.graph-section {
		flex: 1;
		padding: 12px;
		overflow-y: auto;
	}

	.commit-graph {
		display: flex;
		flex-direction: column;
	}

	.commit-row {
		display: flex;
		gap: 12px;
		padding: 8px 0;
		transition: background 0.15s ease;
	}

	.commit-row:hover {
		background: var(--color-surface-800);
	}

	.graph-line {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		flex-shrink: 0;
	}

	.line-segment {
		position: absolute;
		width: 2px;
		height: 100%;
		top: 0;
	}

	.line-connector {
		position: absolute;
		width: 2px;
		left: 0;
	}

	.line-connector.top {
		top: -50%;
		height: 50%;
	}

	.line-connector.bottom {
		bottom: -50%;
		height: 50%;
	}

	.commit-dot {
		position: relative;
		width: 12px;
		height: 12px;
		border: 2px solid;
		border-radius: 50%;
		background: var(--color-surface-900);
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.commit-dot.merge {
		width: 16px;
		height: 16px;
	}

	.commit-info {
		flex: 1;
		min-width: 0;
	}

	.commit-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 4px;
	}

	.commit-hash {
		font-family: 'SF Mono', 'Consolas', monospace;
		font-size: 11px;
		color: var(--color-secondary-500);
		background: rgba(0, 0, 0, 0.2);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.commit-branch {
		font-size: 10px;
		font-weight: 500;
	}

	.commit-message {
		color: var(--color-surface-200);
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 4px;
	}

	.commit-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		color: var(--color-surface-400);
	}

	.graph-section::-webkit-scrollbar {
		width: 8px;
	}

	.graph-section::-webkit-scrollbar-track {
		background: transparent;
	}

	.graph-section::-webkit-scrollbar-thumb {
		background: var(--color-surface-700);
		border-radius: 4px;
	}

	.graph-section::-webkit-scrollbar-thumb:hover {
		background: var(--color-surface-600);
	}
</style>
