import { describe, expect, it } from 'vitest';
import type { Student } from '$lib/types/student';
import { getDisplayedStudents } from './studentList';

const alice: Student = {
	id: '1',
	name: 'Alice Smith',
	age: 20,
	averageScore: 80,
	activeLabel: 'Yes',
	passedLabel: 'Yes'
};

const bob: Student = {
	id: '2',
	name: 'Bob Jones',
	age: 21,
	averageScore: 55,
	activeLabel: 'No',
	passedLabel: 'No'
};

const carol: Student = {
	id: '3',
	name: 'Carol Adams',
	age: 22,
	averageScore: 70,
	activeLabel: 'Yes',
	passedLabel: 'Yes'
};

describe('getDisplayedStudents', () => {
	it('filters by case-insensitive name search', () => {
		const out = getDisplayedStudents([alice, bob, carol], {
			search: 'alice',
			activeOnly: false,
			sortBy: 'name',
			sortDir: 'asc'
		});
		expect(out.map((s) => s.name)).toEqual(['Alice Smith']);
	});

	it('shows only active students when activeOnly is true', () => {
		const out = getDisplayedStudents([alice, bob, carol], {
			search: '',
			activeOnly: true,
			sortBy: 'name',
			sortDir: 'asc'
		});
		expect(out.map((s) => s.id)).toEqual(['1', '3']);
	});

	it('sorts by average score descending', () => {
		const out = getDisplayedStudents([alice, bob, carol], {
			search: '',
			activeOnly: false,
			sortBy: 'averageScore',
			sortDir: 'desc'
		});
		expect(out.map((s) => s.averageScore)).toEqual([80, 70, 55]);
	});
});
