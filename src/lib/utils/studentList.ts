import type { SortDirection, SortField, Student } from '$lib/types/student';

export interface StudentListCriteria {
	search: string;
	activeOnly: boolean;
	sortBy: SortField;
	sortDir: SortDirection;
}

/** Returns a new sorted/filtered array; does not mutate `students`. */
export function getDisplayedStudents(
	students: Student[],
	criteria: StudentListCriteria
): Student[] {
	let list = students.slice();
	if (criteria.activeOnly) {
		list = list.filter((s) => s.activeLabel === 'Yes');
	}
	const q = criteria.search.trim().toLowerCase();
	if (q) {
		list = list.filter((s) => s.name.toLowerCase().includes(q));
	}
	const dir = criteria.sortDir === 'asc' ? 1 : -1;
	list.sort((a, b) => {
		if (criteria.sortBy === 'name') {
			return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) * dir;
		}
		return (a.averageScore - b.averageScore) * dir;
	});
	return list;
}
