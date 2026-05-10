<script lang="ts">
	import type { Student } from '$lib/types/student';

	let { student }: { student: Student } = $props();
</script>

<article class="card" aria-labelledby="student-name-{student.id}">
	<h2 class="name" id="student-name-{student.id}">{student.name}</h2>
	<dl class="fields">
		<div class="row">
			<dt>Age:</dt>
			<dd class="value">{student.age}</dd>
		</div>
		<div class="row">
			<dt>Average score:</dt>
			<dd class="value tabular">{student.averageScore}</dd>
		</div>
		<div class="row">
			<dt>Active:</dt>
			<dd class="value" class:active-no={student.activeLabel === 'No'}>{student.activeLabel}</dd>
		</div>
		<div class="row">
			<dt>Passed:</dt>
			<dd class="value" class:passed-no={student.passedLabel === 'No'}>{student.passedLabel}</dd>
		</div>
		<div class="row">
			<dt>ID:</dt>
			<dd class="value tabular">{student.id}</dd>
		</div>
	</dl>
</article>

<style>
	.card {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--layout-card-column);
		min-height: var(--layout-card-min-height);
		padding: var(--space-5);
		background: #ffffff;
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
	}

	.name {
		margin: 0 0 var(--space-5);
		padding: 0;
		font-family: Verdana, Geneva, sans-serif;
		font-weight: 700;
		font-size: var(--text-card-title);
		line-height: 1;
		letter-spacing: -0.04em;
		text-align: left;
		color: #4b3d47;
	}

	.fields {
		margin: 0;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--space-3);
	}

	.row {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: baseline;
		column-gap: var(--space-3);
	}

	dt {
		margin: 0;
		font-family: Verdana, Geneva, sans-serif;
		font-weight: 400;
		font-size: var(--text-card-field);
		line-height: 1;
		letter-spacing: -0.04em;
		color: #6f626b;
	}

	dd.value {
		margin: 0;
		font-family: Verdana, Geneva, sans-serif;
		font-weight: 700;
		font-size: var(--text-card-field);
		line-height: 1;
		letter-spacing: -0.04em;
		text-align: right;
		color: #000000;
	}

	dd.value.active-no,
	dd.value.passed-no {
		color: #d93030;
	}

	.tabular {
		font-variant-numeric: tabular-nums;
	}
</style>
