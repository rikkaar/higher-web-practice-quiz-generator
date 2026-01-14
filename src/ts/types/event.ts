import type {QuizAnswerResult, QuizQuestion, QuizRecord} from '.'

export type ErrorEvent = {
	error: string
}

export type QuizGeneratorFormSubmitEvent = {
	value: string
}

export type QuizzesLoadSuccessEvent = {
	quizzes: QuizRecord[]
}

export type QuizStartEvent = {
	id: string
}

export type QuizSubmitAnswerEvent = {
	answer: string[]
}

export type QuizSessionStartedEvent = {
	title: string
	description: string
	total: number
}

export type QuizSessionUpdatedEvent = {
	question: QuizQuestion
	currentIndex: number
	total: number
}

export type QuizAnswerResultEvent = {
	question: QuizQuestion
	result: QuizAnswerResult
	answer: string[]
	isLast: boolean
}

export type QuizSessionFinishedEvent = {
	correctCount: number
	total: number
}

export const EVENTS = {
	QUIZ_FORM_SUBMIT: 'quiz-generator-form-submit',
	QUIZ_VALIDATION_FAILED: 'quiz-validation-failed',
	QUIZ_SAVE_SUCCESS: 'quiz-save-success',
	QUIZ_SAVE_FAILED: 'quiz-save-failed',
	TOAST_FIRE: 'toast-fire',
	QUIZZES_LOAD_SUCCESS: 'quizzes-load-success',
	QUIZZES_LOAD_FAILED: 'quizzes-load-failed',
	QUIZ_START: 'quiz-start',
	QUIZ_SUBMIT_ANSWER: 'quiz-submit-answer',
	QUIZ_NEXT: 'quiz-next',
	QUIZ_LOAD_FAILED: 'quiz.load:failed',
	QUIZ_SESSION_STARTED: 'quiz.session:started',
	QUIZ_SESSION_UPDATED: 'quiz.session:updated',
	QUIZ_ANSWER_RESULT: 'quiz.answer:result',
	QUIZ_SESSION_FINISHED: 'quiz.session:finished',
	QUIZ_RESTART: 'quiz-restart',
} as const

export type EventsMap = {
	[EVENTS.QUIZ_FORM_SUBMIT]: QuizGeneratorFormSubmitEvent
	[EVENTS.QUIZ_VALIDATION_FAILED]: ErrorEvent
	[EVENTS.QUIZ_SAVE_SUCCESS]: void
	[EVENTS.QUIZ_SAVE_FAILED]: ErrorEvent
	[EVENTS.TOAST_FIRE]: void
	[EVENTS.QUIZZES_LOAD_SUCCESS]: QuizzesLoadSuccessEvent
	[EVENTS.QUIZZES_LOAD_FAILED]: ErrorEvent
	[EVENTS.QUIZ_START]: QuizStartEvent
	[EVENTS.QUIZ_SUBMIT_ANSWER]: QuizSubmitAnswerEvent
	[EVENTS.QUIZ_NEXT]: void
	[EVENTS.QUIZ_LOAD_FAILED]: ErrorEvent
	[EVENTS.QUIZ_SESSION_STARTED]: QuizSessionStartedEvent
	[EVENTS.QUIZ_SESSION_UPDATED]: QuizSessionUpdatedEvent
	[EVENTS.QUIZ_ANSWER_RESULT]: QuizAnswerResultEvent
	[EVENTS.QUIZ_SESSION_FINISHED]: QuizSessionFinishedEvent
	[EVENTS.QUIZ_RESTART]: void
}
