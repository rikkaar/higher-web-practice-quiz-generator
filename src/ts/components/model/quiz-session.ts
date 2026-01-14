import {Model} from '../base'
import type {EventsMap, IEvents, IQuizDatabase, QuizAnswerResult, QuizRecord} from '../../types'
import {EVENTS, type QuizQuestion} from '../../types'
import {extractError} from '@/ts/utils/extractError'

export class QuizSessionModel extends Model {
	private db: IQuizDatabase
	private quiz: QuizRecord | null
	private currentIndex: number
	private correctCount: number
	private completed: boolean

	constructor(db: IQuizDatabase, events: IEvents<EventsMap>) {
		super(events)
		this.db = db
		this.quiz = null
		this.currentIndex = 0
		this.correctCount = 0
		this.completed = false
	}

	async startQuizSession(quizId: string): Promise<void> {
		this.quiz = null
		this.resetProgress()

		try {
			const quiz = await this.db.getQuiz(quizId)
			if (!quiz) {
				this.emitChanges(EVENTS.QUIZ_LOAD_FAILED, {error: `Quiz with id ${quizId} not found`})
				return
			}
			this.quiz = quiz
		} catch (error) {
			this.emitChanges(EVENTS.QUIZ_LOAD_FAILED, {error: extractError(error)})
			return
		}

		const {title, description, questions} = this.quiz
		this.emitChanges(EVENTS.QUIZ_SESSION_STARTED, {title, description, total: questions.length})
		this.emitSessionUpdated()
	}

	submitAnswer(answer: string[]): QuizAnswerResult | null {
		if (this.completed || !this.quiz) return null

		const question = this.quiz.questions[this.currentIndex]
		if (!question) return null

		const result = this.checkAnswer(question, answer)
		if (result.isCorrect) {
			this.correctCount += 1
		}

		const isLast = this.currentIndex >= this.quiz.questions.length - 1
		this.emitChanges(EVENTS.QUIZ_ANSWER_RESULT, {question, answer, result, isLast})

		return result
	}

	goToNextQuestion(): void {
		if (this.completed || !this.quiz) return

		const hasNext = this.currentIndex < this.quiz.questions.length - 1
		if (!hasNext) {
			return this.finishQuizSession()
		}

		this.currentIndex += 1
		this.emitSessionUpdated()
	}

	restart(): void {
		this.resetProgress()
		this.emitSessionUpdated()
	}

	private finishQuizSession(): void {
		if (!this.quiz) return

		this.completed = true
		this.emitChanges(EVENTS.QUIZ_SESSION_FINISHED, {
			correctCount: this.correctCount,
			total: this.quiz.questions.length,
		})
	}

	private resetProgress(): void {
		this.currentIndex = 0
		this.correctCount = 0
		this.completed = false
	}

	private emitSessionUpdated(): void {
		if (!this.quiz) return

		const question = this.quiz.questions[this.currentIndex]
		if (!question) return

		this.emitChanges(EVENTS.QUIZ_SESSION_UPDATED, {
			question,
			currentIndex: this.currentIndex,
			total: this.quiz.questions.length,
		})
	}

	private areAnswerSetsEqual(selectedIds: number[], correctIds: number[]): boolean {
		if (selectedIds.length !== correctIds.length) return false

		const selectedSet = new Set(selectedIds)
		const correctSet = new Set(correctIds)

		for (const id of selectedSet) {
			if (!correctSet.has(id)) return false
		}

		return true
	}

	private buildOptionsFeedback(question: QuizQuestion, selectedIds: number[]) {
		const selectedIdsSet = new Set(selectedIds)

		return question.options
			.filter((option) => option.correct || selectedIdsSet.has(option.id))
			.map((option) => ({
				id: option.id,
				message: option.message,
				isCorrect: option.correct,
			}))
	}

	private checkAnswer(question: QuizQuestion, answer: string[]): QuizAnswerResult {
		const selectedIds = answer.map((value) => Number(value))
		const correctIds = question.options.filter((option) => option.correct).map((option) => option.id)
		const isCorrect = this.areAnswerSetsEqual(selectedIds, correctIds)
		const options = this.buildOptionsFeedback(question, selectedIds)

		return {isCorrect, options}
	}
}
