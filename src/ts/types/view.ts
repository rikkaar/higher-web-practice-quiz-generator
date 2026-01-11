import type {IEvents} from './base'
import type {EventsMap} from './event'
import type {QuizRecord} from './quiz'

export type HeaderViewData = object

export type HeaderViewSettings = object

export type BaseViewSettings = {
	events: IEvents<EventsMap>
}

export type QuizGeneratorViewData = {
	value?: string
	isValid?: boolean
}

export type QuizGeneratorViewSettings = BaseViewSettings

export type ToastViewData = {
	title?: string
	message?: string
	action?: string
	isVisible: boolean
}

export type ToastViewSettings = BaseViewSettings

export type QuizzesViewData = {
	cards: HTMLElement[]
}

export type QuizzesViewSettings = BaseViewSettings

export type QuizCardViewData = QuizRecord

export type QuizCardViewSettings = BaseViewSettings
