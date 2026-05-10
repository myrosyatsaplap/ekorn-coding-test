/**
 * Whole calendar years from an ISO-like date string `YYYY-MM-DD` to `reference`,
 * using the runtime local calendar (avoids UTC midnight shifting the calendar day).
 */
export function calculateAge(birthdate: string, reference: Date = new Date()): number {
	const parts = birthdate.split('-').map(Number);

	if (parts.length !== 3 || parts.some(Number.isNaN)) {
		return 0;
	}

	const [year, month, day] = parts;

	const birth = new Date(year, month - 1, day);

	let age = reference.getFullYear() - birth.getFullYear();

	const hasHadBirthdayThisYear =
		reference.getMonth() > birth.getMonth() ||
		(reference.getMonth() === birth.getMonth() && reference.getDate() >= birth.getDate());

	if (!hasHadBirthdayThisYear) {
		age--;
	}

	return Math.max(0, age);
}
