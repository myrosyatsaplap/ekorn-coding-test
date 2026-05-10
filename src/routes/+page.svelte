<script lang="ts">
	import { onMount } from 'svelte';
	import StudentCard from '$lib/components/StudentCard.svelte';
	import StudentControls from '$lib/components/StudentControls.svelte';
	import LoadingState from '$lib/components/LoadingState.svelte';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import type { SortDirection, SortField, Student } from '$lib/types/student';
	import { assertStudentDataArray, transformStudentDataItem } from '$lib/utils/transformStudent';
	import { getDisplayedStudents } from '$lib/utils/studentList';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let students = $state<Student[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	let searchQuery = $state('');
	let debouncedSearch = $state('');
	let activeOnly = $state(false);
	let sortBy = $state<SortField>('name');
	let sortDir = $state<SortDirection>('asc');

	$effect(() => {
		const q = searchQuery;
		if (q.length === 0) {
			debouncedSearch = '';
			return;
		}
		const handle = window.setTimeout(() => {
			debouncedSearch = q;
		}, 240);
		return () => window.clearTimeout(handle);
	});

	const displayedStudents = $derived(
		getDisplayedStudents(students, {
			search: debouncedSearch,
			activeOnly,
			sortBy,
			sortDir
		})
	);

	onMount(() => {
		const controller = new AbortController();

		(async () => {
			try {
				const response = await fetch('/api/students', { signal: controller.signal });
				if (!response.ok) {
					throw new Error(`Could not load students (HTTP ${response.status}). Please try again.`);
				}
				const payload: unknown = await response.json();
				const items = assertStudentDataArray(payload);
				students = items.map(transformStudentDataItem);
				error = null;
			} catch (e) {
				if (e instanceof DOMException && e.name === 'AbortError') {
					return;
				}
				students = [];
				error = e instanceof Error ? e.message : 'Could not load students. Please try again later.';
			} finally {
				loading = false;
			}
		})();

		return () => controller.abort();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Students</title>
</svelte:head>

<div class="page">
	<a class="skip-link" href="#main-students">Skip to main content</a>

	<main id="main-students" class="layout-column" tabindex="-1">
		<header class="page-header">
			<h1 class="page-title">Students</h1>
		</header>

		{#if loading}
			<LoadingState />
		{:else if error}
			<ErrorState message={error} />
		{:else}
			<StudentControls bind:searchQuery bind:activeOnly bind:sortBy bind:sortDir />

			<p class="sr-only" aria-live="polite" aria-atomic="true">
				{displayedStudents.length === 0
					? 'No students match the current filters.'
					: `${displayedStudents.length} student${displayedStudents.length === 1 ? '' : 's'} match the current filters.`}
			</p>

			{#if displayedStudents.length === 0}
				<div class="empty-state">
					<p class="empty-title">
						{students.length === 0 ? 'No students to show' : 'No matching students'}
					</p>
					<p class="empty-body">
						{students.length === 0
							? 'The API returned an empty list.'
							: 'Try clearing search or turning off the active-only filter.'}
					</p>
				</div>
			{:else}
				<ul class="student-grid" aria-label="Student results">
					{#each displayedStudents as student (student.id)}
						<li class="student-grid-cell">
							<StudentCard {student} />
						</li>
					{/each}
				</ul>
			{/if}
		{/if}
	</main>
</div>

<style>
	.page {
		position: relative;
		min-height: 100vh;
		padding: var(--space-7) var(--space-5) var(--space-9);
	}

	/* Title + loading/error + controls + grid share one width (card columns) */
	.layout-column {
		--card-col: var(--layout-card-column);
		--card-gap: var(--space-5);
		/* README: content band must not exceed 1024px */
		max-width: var(--layout-max-content);
		width: min(100%, var(--card-col));
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: var(--card-gap);
	}

	/* Same breakpoints as --breakpoint-* in app.css; literal px because var() in @media (min-width) is not portable. */
	@media (min-width: 680px) {
		.layout-column {
			width: min(100%, calc(2 * var(--card-col) + var(--card-gap)));
		}
	}

	@media (min-width: 1024px) {
		.layout-column {
			width: min(100%, calc(3 * var(--card-col) + 2 * var(--card-gap)));
		}
	}

	.page-header {
		margin: 0;
	}

	.page-title {
		margin: 0;
		font-family: var(--font-page-title);
		font-weight: 700;
		font-size: var(--text-page-title);
		line-height: 1;
		letter-spacing: -0.02em;
		color: #4b3d47;
	}

	/* Visible focus after “Skip to main content” (programmatic focus is not always :focus-visible) */
	.layout-column:focus {
		outline: var(--focus-outline) solid var(--accent-border);
		outline-offset: var(--focus-outline-offset);
	}

	.empty-state {
		width: 100%;
		margin: 0;
		padding: var(--space-8) var(--space-6);
		text-align: center;
		font-family: var(--font-sans);
		background: var(--surface-elevated);
		border: 1px dashed var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
	}

	.empty-title {
		margin: 0 0 var(--space-2);
		font-size: var(--text-md);
		font-weight: 700;
		font-family: var(--font-page-title);
		color: #4b3d47;
	}

	.empty-body {
		margin: 0;
		font-size: var(--text-sm);
		line-height: 1.5;
		color: var(--text-secondary);
		max-width: var(--line-max-prose);
		margin-inline: auto;
	}
</style>
