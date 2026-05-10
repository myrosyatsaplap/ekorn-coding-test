<script lang="ts">
	import type { SortDirection, SortField } from '$lib/types/student';

	let {
		searchQuery = $bindable(''),
		activeOnly = $bindable(false),
		sortBy = $bindable<SortField>('name'),
		sortDir = $bindable<SortDirection>('asc')
	} = $props();

	const searchId = 'student-search';
	const activeId = 'student-active-only';
	const sortById = 'student-sort-by';
	const sortDirId = 'student-sort-dir';
</script>

<fieldset class="controls-panel">
	<legend class="sr-only">Filter and sort students</legend>
	<div class="controls-grid">
		<div class="field field-grow">
			<label for={searchId}>Search</label>
			<input
				id={searchId}
				type="search"
				placeholder="Search by student name"
				autocomplete="off"
				spellcheck="false"
				aria-describedby={`${searchId}-hint`}
				bind:value={searchQuery}
			/>
			<span id={`${searchId}-hint`} class="sr-only"
				>Results update shortly after you stop typing.</span
			>
		</div>

		<div class="field field-toggle">
			<label class="toggle-wrap">
				<input
					id={activeId}
					type="checkbox"
					bind:checked={activeOnly}
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							activeOnly = !activeOnly;
						}
					}}
				/>
				<span class="toggle-text">Active students only</span>
			</label>
		</div>

		<div class="field">
			<label for={sortById}>Sort by</label>
			<select id={sortById} bind:value={sortBy}>
				<option value="name">Name</option>
				<option value="averageScore">Average score</option>
			</select>
		</div>

		<div class="field">
			<label for={sortDirId}>Order</label>
			<select id={sortDirId} bind:value={sortDir}>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>
		</div>
	</div>
</fieldset>

<style>
	.controls-panel {
		box-sizing: border-box;
		width: 100%;
		margin: 0;
		padding: var(--space-5);
		border: none;
		min-width: 0;
		font-family: var(--font-sans);
		background: #ffffff;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
	}

	.controls-grid {
		display: grid;
		gap: var(--space-4) var(--space-5);
		align-items: end;
		grid-template-columns: 1fr;
	}

	@media (min-width: 720px) {
		.controls-grid {
			grid-template-columns: minmax(12rem, 1.4fr) auto minmax(9rem, 0.75fr) minmax(9rem, 0.75fr);
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-width: 0;
	}

	.field-grow {
		min-width: 0;
	}

	.field-toggle {
		justify-content: flex-end;
		padding-bottom: var(--space-1);
	}

	.toggle-wrap {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-height: var(--space-8);
		cursor: pointer;
	}

	label:not(.toggle-wrap) {
		font-family: Verdana, Geneva, sans-serif;
		font-size: var(--text-ui);
		font-weight: 600;
		letter-spacing: -0.02em;
		color: #6f626b;
	}

	.toggle-text {
		font-family: Verdana, Geneva, sans-serif;
		font-size: var(--text-ui);
		font-weight: 600;
		letter-spacing: -0.02em;
		color: #6f626b;
		user-select: none;
	}

	input[type='search'] {
		width: 100%;
		min-height: var(--space-8);
		padding: var(--space-2) var(--space-3);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background: var(--surface-default);
		color: var(--text-primary);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	/* Native OS chevrons ignore padding in WebKit/Blink; custom icon + appearance:none fixes spacing */
	select {
		width: 100%;
		min-height: var(--space-8);
		padding: var(--space-2) var(--control-select-padding-end) var(--space-2) var(--space-3);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		background-color: #ffffff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%234B3D47' d='M6 7.5 0.5 0.5h11z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right var(--space-3) center;
		background-size: var(--icon-chevron-w) var(--icon-chevron-h);
		color: var(--text-primary);
		cursor: pointer;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	select::-ms-expand {
		display: none;
	}

	input[type='search']::placeholder {
		color: var(--text-tertiary);
	}

	input[type='search']:hover {
		border-color: var(--border-strong);
	}

	select:hover {
		border-color: var(--border-strong);
	}

	input[type='search']:focus-visible,
	select:focus-visible {
		outline: none;
		border-color: var(--accent-border);
		box-shadow: 0 0 0 var(--focus-ring-spread) var(--focus-ring);
	}

	input[type='checkbox'] {
		width: var(--size-checkbox);
		height: var(--size-checkbox);
		border-radius: var(--radius-sm);
		accent-color: var(--accent);
		cursor: pointer;
	}

	input[type='checkbox']:focus-visible {
		outline: none;
		box-shadow: 0 0 0 var(--focus-ring-spread) var(--focus-ring);
	}
</style>
