import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import LoadingState from './LoadingState.svelte';

describe('LoadingState', () => {
	it('exposes a polite status region with loading copy', () => {
		render(LoadingState);
		const region = screen.getByRole('status');
		expect(region).toHaveTextContent(/loading students/i);
		expect(region.querySelector('.student-grid')).toBeTruthy();
	});
});
