<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft, MailWarning, House, TriangleAlert } from '@lucide/svelte';
</script>

<div class="error-container">
	<div class="error-panel">
		<div class="panel-header">
			<div class="header-left">
				<TriangleAlert class="w-4 h-4 text-warning" />
				<span class="header-title">PROBLEMS</span>
				<span class="error-count">1</span>
			</div>
			<div class="header-tabs">
				<span class="tab active">Errors</span>
				<span class="tab">Warnings</span>
				<span class="tab">Output</span>
			</div>
		</div>

		<div class="panel-content">
			<div class="error-line">
				<MailWarning class="w-4 h-4 error-icon" />
				<div class="error-details">
					<div class="error-message">
						<span class="error-type">Error</span>
						<span class="error-code">[{page.status}]</span>
						<span class="error-text">{page.error?.message || 'Page Not Found'}</span>
					</div>
					<div class="error-location">
						<span class="file-path">/{page.url.pathname.slice(1) || 'unknown'}</span>
						<span class="separator">:</span>
						<span class="line-number">1</span>
						<span class="separator">:</span>
						<span class="column-number">1</span>
					</div>
				</div>
			</div>

			<div class="code-preview">
				<div class="line-numbers">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
				</div>
				<div class="code-content">
					<div class="code-line">
						<span class="keyword">import</span>
						<span class="string"> '{page.url.pathname}'</span>
						<span class="keyword"> from</span>
						<span class="string"> 'routes'</span>;
					</div>
					<div class="code-line error-highlight">
						<span class="comment">// ❌ Module not found: Cannot resolve '{page.url.pathname}'</span
						>
					</div>
					<div class="code-line">
						<span class="comment">// This route does not exist in the application</span>
					</div>
					<div class="code-line"></div>
					<div class="code-line">
						<span class="keyword">export default</span>
						<span class="function"> null</span>;
					</div>
				</div>
			</div>

			<div class="suggestions">
				<div class="suggestion-header">
					<span class="lightbulb">💡</span>
					Quick Fix Available
				</div>
				<div class="suggestion-actions">
					<a href="/" class="suggestion-btn primary">
						<House class="w-4 h-4" />
						Navigate to Home
					</a>
					<button class="suggestion-btn secondary" onclick={() => history.back()}>
						<ArrowLeft class="w-4 h-4" />
						Go Back
					</button>
				</div>
			</div>
		</div>

		<div class="status-bar">
			<div class="status-left">
				<span class="status-item error">
					<TriangleAlert class="w-3 h-3" />
					1 error
				</span>
				<span class="status-item">0 warnings</span>
			</div>
			<div class="status-right">
				<span class="status-item">UTF-8</span>
				<span class="status-item">LF</span>
				<span class="status-item">Svelte</span>
			</div>
		</div>
	</div>
</div>

<style>
	.error-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: var(--color-surface-950);
		padding: 2rem;
	}

	.error-panel {
		width: 100%;
		max-width: 700px;
		background: var(--color-surface-900);
		border-radius: 8px;
		border: 1px solid var(--color-surface-800);
		overflow: hidden;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		background: var(--color-surface-800);
		border-bottom: 1px solid var(--color-surface-700);
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.header-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-surface-200);
	}

	.error-count {
		background: #e53935;
		color: white;
		font-size: 0.65rem;
		font-weight: 700;
		padding: 0.1rem 0.4rem;
		border-radius: 10px;
	}

	.text-warning {
		color: #ffb74d;
	}

	.header-tabs {
		display: flex;
		gap: 0.5rem;
	}

	.tab {
		font-size: 0.7rem;
		color: var(--color-surface-400);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.tab:hover {
		color: var(--color-surface-200);
	}

	.tab.active {
		background: var(--color-surface-700);
		color: var(--color-surface-100);
	}

	.panel-content {
		padding: 1rem;
	}

	.error-line {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.75rem;
		background: rgba(229, 57, 53, 0.1);
		border-left: 3px solid #e53935;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.error-icon {
		color: #e53935;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.error-details {
		flex: 1;
		min-width: 0;
	}

	.error-message {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.error-type {
		color: #e53935;
		font-weight: 600;
		font-size: 0.85rem;
	}

	.error-code {
		color: var(--color-surface-400);
		font-size: 0.8rem;
		font-family: 'Fira Code', 'Consolas', monospace;
	}

	.error-text {
		color: var(--color-surface-200);
		font-size: 0.85rem;
	}

	.error-location {
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.75rem;
		color: var(--color-surface-400);
	}

	.file-path {
		color: #64b5f6;
	}

	.separator {
		color: var(--color-surface-500);
	}

	.line-number,
	.column-number {
		color: #81c784;
	}

	.code-preview {
		display: flex;
		background: var(--color-surface-950);
		border-radius: 6px;
		overflow: hidden;
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.8rem;
		margin-bottom: 1rem;
		border: 1px solid var(--color-surface-800);
	}

	.line-numbers {
		display: flex;
		flex-direction: column;
		padding: 0.75rem 0.75rem;
		background: var(--color-surface-900);
		color: var(--color-surface-500);
		text-align: right;
		user-select: none;
		border-right: 1px solid var(--color-surface-800);
	}

	.line-numbers span {
		line-height: 1.5;
	}

	.code-content {
		flex: 1;
		padding: 0.75rem;
		overflow-x: auto;
	}

	.code-line {
		line-height: 1.5;
		white-space: nowrap;
	}

	.error-highlight {
		background: rgba(229, 57, 53, 0.15);
		margin: 0 -0.75rem;
		padding: 0 0.75rem;
		border-left: 2px solid #e53935;
	}

	.keyword {
		color: #c678dd;
	}

	.string {
		color: #98c379;
	}

	.function {
		color: #61afef;
	}

	.comment {
		color: #5c6370;
		font-style: italic;
	}

	.suggestions {
		background: var(--color-surface-800);
		border-radius: 6px;
		padding: 1rem;
	}

	.suggestion-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--color-surface-200);
		margin-bottom: 0.75rem;
	}

	.lightbulb {
		font-size: 1rem;
	}

	.suggestion-actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.suggestion-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1rem;
		border-radius: 6px;
		font-size: 0.8rem;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
	}

	.suggestion-btn.primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.suggestion-btn.primary:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	.suggestion-btn.secondary {
		background: var(--color-surface-700);
		color: var(--color-surface-200);
	}

	.suggestion-btn.secondary:hover {
		background: var(--color-surface-600);
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		padding: 0.35rem 1rem;
		background: var(--color-surface-800);
		border-top: 1px solid var(--color-surface-700);
		font-size: 0.7rem;
	}

	.status-left,
	.status-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.status-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--color-surface-400);
	}

	.status-item.error {
		color: #e53935;
	}

	@media (max-width: 640px) {
		.error-container {
			padding: 1rem;
		}

		.header-tabs {
			display: none;
		}

		.code-preview {
			font-size: 0.7rem;
		}

		.suggestion-actions {
			flex-direction: column;
		}

		.suggestion-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
