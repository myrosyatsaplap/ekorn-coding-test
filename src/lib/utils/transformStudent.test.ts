import { describe, expect, it } from 'vitest';
import type { StudentDataItem } from '$lib/data';
import { assertStudentDataArray, transformStudentDataItem } from './transformStudent';

const baseItem = (): StudentDataItem => ({
	id: 42,
	firstName: 'Ada',
	lastName: 'Lovelace',
	birthdate: '2000-05-10',
	scores: { math: 70, english: 80, science: 90 },
	isActive: true
});

describe('transformStudentDataItem', () => {
	it('stringifies id', () => {
		expect(transformStudentDataItem(baseItem()).id).toBe('42');
	});

	it('concatenates first and last name with a single space', () => {
		expect(transformStudentDataItem(baseItem()).name).toBe('Ada Lovelace');
	});

	it('rounds average score to nearest whole number', () => {
		const item = { ...baseItem(), scores: { math: 62, english: 62, science: 61 } };
		expect(transformStudentDataItem(item).averageScore).toBe(62);
	});

	it('maps activeLabel from isActive', () => {
		expect(transformStudentDataItem({ ...baseItem(), isActive: true }).activeLabel).toBe('Yes');
		expect(transformStudentDataItem({ ...baseItem(), isActive: false }).activeLabel).toBe('No');
	});

	it('derives passedLabel from rounded average (>= 60)', () => {
		expect(transformStudentDataItem(baseItem()).passedLabel).toBe('Yes');
		const fail = {
			...baseItem(),
			scores: { math: 50, english: 50, science: 59 }
		};
		expect(transformStudentDataItem(fail).passedLabel).toBe('No');
	});

	it('uses rounded average for pass threshold, not raw mean', () => {
		const edge = {
			...baseItem(),
			scores: { math: 59, english: 59, science: 62 }
		};
		expect(transformStudentDataItem(edge).averageScore).toBe(60);
		expect(transformStudentDataItem(edge).passedLabel).toBe('Yes');
	});
});

describe('assertStudentDataArray', () => {
	it('returns the array when every row is valid', () => {
		const raw = [baseItem()];
		expect(assertStudentDataArray(raw)).toBe(raw);
	});

	it('throws when payload is not an array', () => {
		expect(() => assertStudentDataArray({})).toThrow(/unexpected data shape/i);
	});

	it('throws when a row is invalid', () => {
		expect(() => assertStudentDataArray([{ id: 'x' }])).toThrow(/unexpected data shape/i);
	});
});
