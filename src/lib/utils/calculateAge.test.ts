import { describe, expect, it } from 'vitest';
import { calculateAge } from './calculateAge';

describe('calculateAge', () => {
	const refMidMay2026 = new Date(2026, 4, 10); /* 10 May 2026, local */

	it('uses full year when birthday already occurred this year', () => {
		expect(calculateAge('2000-04-01', refMidMay2026)).toBe(26);
	});

	it('subtracts a year when birthday has not yet occurred this year', () => {
		expect(calculateAge('2000-06-15', refMidMay2026)).toBe(25);
	});

	it('counts correctly when birthday is today', () => {
		expect(calculateAge('2000-05-10', refMidMay2026)).toBe(26);
	});

	it('returns 0 for malformed birthdate', () => {
		expect(calculateAge('not-a-date', refMidMay2026)).toBe(0);
		expect(calculateAge('2000-xx-01', refMidMay2026)).toBe(0);
	});

	it('returns 0 for future birth year relative to reference', () => {
		expect(calculateAge('2030-01-01', refMidMay2026)).toBe(0);
	});
});
