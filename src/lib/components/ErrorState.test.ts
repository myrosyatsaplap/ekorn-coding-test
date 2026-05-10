import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ErrorState from './ErrorState.svelte';

describe('ErrorState', () => {
	it('renders an alert with title, server message, and recovery hint', () => {
		render(ErrorState, { props: { message: 'Could not reach server' } });
		const alert = screen.getByRole('alert');
		expect(alert).toHaveTextContent('Could not reach server');
		expect(alert).toHaveTextContent(/unable to load students/i);
		expect(alert).toHaveTextContent(/check your connection and refresh/i);
		expect(
			screen.getByRole('heading', { level: 2, name: /unable to load students/i })
		).toBeInTheDocument();
	});

	it('decorative accent bar is hidden from the accessibility tree', () => {
		render(ErrorState, { props: { message: 'Something went wrong' } });
		const accent = document.querySelector('.accent');
		expect(accent).toBeTruthy();
		expect(accent).toHaveAttribute('aria-hidden', 'true');
	});
});
