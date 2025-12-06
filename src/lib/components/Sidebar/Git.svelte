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

	// Mock data for commits
	const commits = [
		{
			hash: 'a3f7c2d',
			message: 'feat: Add new portfolio sections',
			author: 'Ramzy KEMMOUN',
			time: '2 hours ago',
			branch: 'main',
			color: '#4ade80',
			isMerge: false
		},
		{
			hash: 'b8e1f4a',
			message: 'style: Update SearchDialog to VS Code style',
			author: 'Ramzy KEMMOUN',
			time: '3 hours ago',
			branch: 'main',
			color: '#4ade80',
			isMerge: false
		},
		{
			hash: 'c2d9e7b',
			message: 'Merge branch feature/skills into main',
			author: 'Ramzy KEMMOUN',
			time: '5 hours ago',
			branch: 'main',
			color: '#4ade80',
			isMerge: true
		},
		{
			hash: 'f5a3c1e',
			message: 'feat: Implement Skills section with animations',
			author: 'Ramzy KEMMOUN',
			time: '6 hours ago',
			branch: 'feature/skills',
			color: '#60a5fa',
			isMerge: false
		},
		{
			hash: 'd7b2e8f',
			message: 'fix: Terminal resize behavior',
			author: 'Ramzy KEMMOUN',
			time: '1 day ago',
			branch: 'main',
			color: '#4ade80',
			isMerge: false
		},
		{
			hash: 'e9c4f2a',
			message: 'feat: Add Experiences section Japanese theme',
			author: 'Ramzy KEMMOUN',
			time: '2 days ago',
			branch: 'main',
			color: '#4ade80',
			isMerge: false
		},
		{
			hash: 'g1h5i9j',
			message: 'chore: Update dependencies',
			author: 'Ramzy KEMMOUN',
			time: '3 days ago',
			branch: 'main',
			color: '#4ade80',
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
	<!-- Header -->
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

	<!-- Branch Selector -->
	<div class="branch-selector">
		<button class="branch-btn" onclick={() => (showBranchDropdown = !showBranchDropdown)}>
			<GitBranch class="w-4 h-4 text-green-400" />
			<span class="branch-name">{selectedBranch}</span>
			<span class="branch-status">✓ synced</span>
		</button>

		{#if showBranchDropdown}
			<div class="branch-dropdown">
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

	<!-- Git Actions -->
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

	<!-- Commit Input -->
	<div class="commit-input-section">
		<input type="text" placeholder="Message (Ctrl+Enter to commit)" class="commit-input" />
		<button class="commit-btn">
			<Check class="w-4 h-4" />
		</button>
	</div>

	<!-- Changes Section -->
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

	<!-- Git Graph Section -->
	<div class="graph-section">
		<div class="section-header">
			<span>Commit History</span>
			<span class="commit-count">{commits.length}</span>
		</div>

		<div class="commit-graph">
			{#each commits as commit, i}
				<div class="commit-row">
					<!-- Graph Line -->
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

					<!-- Commit Info -->
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
		background: #1e1e1e;
		color: #cccccc;
		font-size: 12px;
		overflow: hidden;
	}

	.git-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		border-bottom: 1px solid #3c3c3c;
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
		color: #808080;
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
		color: #808080;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #cccccc;
	}

	.branch-selector {
		position: relative;
		padding: 8px 12px;
		border-bottom: 1px solid #3c3c3c;
	}

	.branch-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #3c3c3c;
		border-radius: 6px;
		color: #cccccc;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.branch-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: #4ade80;
	}

	.branch-name {
		flex: 1;
		text-align: left;
		font-weight: 500;
	}

	.branch-status {
		font-size: 10px;
		color: #4ade80;
		background: rgba(74, 222, 128, 0.1);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.branch-dropdown {
		position: absolute;
		top: 100%;
		left: 12px;
		right: 12px;
		background: #252526;
		border: 1px solid #3c3c3c;
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
		color: #cccccc;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.branch-option:hover,
	.branch-option.active {
		background: rgba(255, 255, 255, 0.1);
	}

	.current-badge {
		font-size: 9px;
		color: #4ade80;
		background: rgba(74, 222, 128, 0.15);
		padding: 1px 5px;
		border-radius: 3px;
		margin-left: auto;
	}

	.sync-status {
		font-size: 10px;
		color: #f59e0b;
		margin-left: auto;
	}

	.git-actions {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 6px;
		padding: 12px;
		border-bottom: 1px solid #3c3c3c;
	}

	.git-action-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 10px 6px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid #3c3c3c;
		border-radius: 6px;
		color: #808080;
		font-size: 10px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.git-action-btn:hover {
		background: rgba(74, 222, 128, 0.1);
		border-color: #4ade80;
		color: #4ade80;
	}

	.commit-input-section {
		display: flex;
		gap: 8px;
		padding: 12px;
		border-bottom: 1px solid #3c3c3c;
	}

	.commit-input {
		flex: 1;
		padding: 10px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #3c3c3c;
		border-radius: 6px;
		color: #cccccc;
		font-size: 12px;
		outline: none;
		transition: border-color 0.15s ease;
	}

	.commit-input::placeholder {
		color: #6e6e6e;
	}

	.commit-input:focus {
		border-color: #4ade80;
	}

	.commit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		background: #4ade80;
		border: none;
		border-radius: 6px;
		color: #1e1e1e;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.commit-btn:hover {
		background: #22c55e;
	}

	.changes-section {
		padding: 12px;
		border-bottom: 1px solid #3c3c3c;
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
		color: #808080;
	}

	.change-count,
	.commit-count {
		font-size: 10px;
		background: rgba(255, 255, 255, 0.1);
		padding: 2px 8px;
		border-radius: 10px;
	}

	.no-changes {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 16px;
		color: #4ade80;
		background: rgba(74, 222, 128, 0.05);
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
		background: rgba(255, 255, 255, 0.03);
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
		background: #1e1e1e;
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
		color: #60a5fa;
		background: rgba(96, 165, 250, 0.1);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.commit-branch {
		font-size: 10px;
		font-weight: 500;
	}

	.commit-message {
		color: #cccccc;
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
		color: #6e6e6e;
	}

	/* Scrollbar */
	.graph-section::-webkit-scrollbar {
		width: 8px;
	}

	.graph-section::-webkit-scrollbar-track {
		background: transparent;
	}

	.graph-section::-webkit-scrollbar-thumb {
		background: #424242;
		border-radius: 4px;
	}

	.graph-section::-webkit-scrollbar-thumb:hover {
		background: #4f4f4f;
	}
</style>
