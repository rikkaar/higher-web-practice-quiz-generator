import {z} from 'zod'
import {QuizOptionSchema, QuizQuestionSchema, QuizSchema} from '../schema'
import type {DBSchema} from 'idb'

export type QuizOption = z.infer<typeof QuizOptionSchema>
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>
export type QuizData = z.infer<typeof QuizSchema>

export interface QuizRecord extends QuizData {
	id: string
}

export type QuizAnswerResult = {
	isCorrect: boolean
	texts: {
		id: number
		message: string
		isSuccess: boolean
	}[]
}

export interface QuizDB extends DBSchema {
	quizzes: {
		key: string
		value: QuizRecord
	}
}

export interface IQuizDatabase {
	getAllQuizzes(): Promise<QuizRecord[]>
	getQuiz(id: string): Promise<QuizRecord | undefined>
	saveQuiz(quizData: QuizData): Promise<string>
	deleteQuiz(id: string): Promise<void>
	clearAllQuizzes(): Promise<void>
}
