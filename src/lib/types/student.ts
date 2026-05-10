/** View model for one student row (post-transformation). */
export interface Student {
	id: string;
	name: string;
	age: number;
	averageScore: number;
	activeLabel: 'Yes' | 'No';
	passedLabel: 'Yes' | 'No';
}

export type SortField = 'name' | 'averageScore';
export type SortDirection = 'asc' | 'desc';
