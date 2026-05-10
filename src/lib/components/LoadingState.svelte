<div class="loading-root" role="status" aria-live="polite" aria-busy="true">
	<div class="loading-heading">
		<p class="loading-hint">Loading students…</p>
	</div>
	<ul class="student-grid" aria-hidden="true">
		{#each [0, 1, 2, 3, 4, 5] as slot (slot)}
			<li class="student-grid-cell">
				<article class="skeleton-card">
					<div class="skeleton-title"></div>
					<div class="skeleton-rows">
						{#each [0, 1, 2, 3, 4] as row (row)}
							<div class="skeleton-row">
								<span class="skeleton-line skeleton-line--label"></span>
								<span class="skeleton-line skeleton-line--value"></span>
							</div>
						{/each}
					</div>
				</article>
			</li>
		{/each}
	</ul>
</div>

<style>
	.loading-root {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.loading-heading {
		margin: 0;
		padding: 0;
		width: 100%;
	}

	.loading-hint {
		margin: 0;
		padding: 0;
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 400;
		line-height: 1.4;
		color: var(--text-secondary);
	}

	.skeleton-card {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--layout-card-column);
		min-height: var(--layout-card-min-height);
		padding: var(--space-5);
		background: var(--surface-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
	}

	.skeleton-title {
		height: 1.5rem;
		width: 72%;
		margin: 0 0 var(--space-5);
		border-radius: var(--radius-sm);
		background: var(--border-subtle);
		animation: skeleton-pulse 1.1s ease-in-out infinite;
	}

	.skeleton-rows {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--space-3);
	}

	.skeleton-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
	}

	.skeleton-line {
		display: block;
		height: 1.05rem;
		border-radius: var(--radius-sm);
		background: var(--border-subtle);
		animation: skeleton-pulse 1.1s ease-in-out infinite;
	}

	.skeleton-line--label {
		width: 52%;
		max-width: 11rem;
	}

	.skeleton-line--value {
		width: 22%;
		min-width: 2.25rem;
	}

	@keyframes skeleton-pulse {
		50% {
			opacity: 0.62;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton-title,
		.skeleton-line {
			animation: none;
			opacity: 0.85;
		}
	}
</style>
