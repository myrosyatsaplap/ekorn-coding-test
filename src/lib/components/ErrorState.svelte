<script lang="ts">
	let { message }: { message: string } = $props();
</script>

<div class="panel" role="alert">
	<div class="accent" aria-hidden="true"></div>
	<div class="body">
		<h2 class="title">Unable to load students</h2>
		<p class="detail">{message}</p>
		<p class="hint">Check your connection and refresh the page.</p>
	</div>
</div>

<style>
	.panel {
		box-sizing: border-box;
		display: flex;
		gap: var(--space-4);
		width: 100%;
		max-width: 100%;
		min-width: 0;
		margin: 0;
		padding: var(--space-5);
		font-family: var(--font-sans);
		background: var(--surface-elevated);
		border: 1px solid var(--border-error);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
	}

	.accent {
		flex-shrink: 0;
		width: var(--space-1);
		align-self: stretch;
		border-radius: var(--radius-xs);
		background: var(--text-error);
	}

	.body {
		min-width: 0;
	}

	.title {
		margin: 0 0 var(--space-2);
		font-family: var(--font-page-title);
		font-size: var(--text-card-field);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	.detail {
		margin: 0 0 var(--space-2);
		font-size: var(--text-sm);
		line-height: 1.5;
		color: var(--text-secondary);
	}

	.hint {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--text-tertiary);
	}
</style>
