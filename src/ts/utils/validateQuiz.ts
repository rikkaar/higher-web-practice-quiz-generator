import type {QuizData} from '../types'
import {QuizSchema} from '../schema'
import {extractError} from './extractError'

type ValidationResult = {isValid: false; error: string} | {isValid: true; data: QuizData}

export function validateQuiz(jsonString: string): ValidationResult {
	let parsed: unknown

	try {
		parsed = JSON.parse(jsonString)
	} catch (error) {
		return {isValid: false, error: extractError(error)}
	}

	const result = QuizSchema.safeParse(parsed)

	if (!result.success) {
		return {isValid: false, error: result.error.message}
	}

	return {isValid: true, data: result.data}
}
