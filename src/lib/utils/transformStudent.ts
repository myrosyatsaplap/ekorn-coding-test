import type { StudentDataItem } from '$lib/data';
import type { Student } from '$lib/types/student';
import { calculateAge } from '$lib/utils/calculateAge';

function isStudentDataItem(value: unknown): value is StudentDataItem {
	if (!value || typeof value !== 'object') return false;
	const o = value as Record<string, unknown>;
	if (
		typeof o.id !== 'number' ||
		typeof o.firstName !== 'string' ||
		typeof o.lastName !== 'string' ||
		typeof o.birthdate !== 'string' ||
		typeof o.isActive !== 'boolean' ||
		o.scores === null ||
		typeof o.scores !== 'object'
	) {
		return false;
	}
	const scores = o.scores as Record<string, unknown>;
	return (
		typeof scores.math === 'number' &&
		typeof scores.english === 'number' &&
		typeof scores.science === 'number'
	);
}

/** Throws if the JSON body is not a `StudentDataItem[]`. */
export function assertStudentDataArray(payload: unknown): StudentDataItem[] {
	if (!Array.isArray(payload) || !payload.every(isStudentDataItem)) {
		throw new Error('The server returned an unexpected data shape.');
	}
	return payload;
}

export function transformStudentDataItem(item: StudentDataItem): Student {
	const { math, english, science } = item.scores;
	const averageScore = Math.round((math + english + science) / 3);
	const activeLabel: 'Yes' | 'No' = item.isActive ? 'Yes' : 'No';
	const passedLabel: 'Yes' | 'No' = averageScore >= 60 ? 'Yes' : 'No';

	return {
		id: String(item.id),
		name: `${item.firstName} ${item.lastName}`,
		age: calculateAge(item.birthdate),
		averageScore,
		activeLabel,
		passedLabel
	};
}
