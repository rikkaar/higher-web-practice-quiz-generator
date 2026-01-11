import type {QuizRecord} from '.'

export interface ErrorEvent {
	error: string
}

export interface QuizGeneratorFormSubmitEvent {
	value: string
}

export interface QuizzesLoadSuccessEvent {
	quizzes: QuizRecord[]
}

export interface QuizStartEvent {
	id: string
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
} as const

export interface EventsMap {
	[EVENTS.QUIZ_FORM_SUBMIT]: QuizGeneratorFormSubmitEvent
	[EVENTS.QUIZ_VALIDATION_FAILED]: ErrorEvent
	[EVENTS.QUIZ_SAVE_SUCCESS]: void
	[EVENTS.QUIZ_SAVE_FAILED]: ErrorEvent
	[EVENTS.TOAST_FIRE]: void
	[EVENTS.QUIZZES_LOAD_SUCCESS]: QuizzesLoadSuccessEvent
	[EVENTS.QUIZZES_LOAD_FAILED]: ErrorEvent
	[EVENTS.QUIZ_START]: QuizStartEvent
}
