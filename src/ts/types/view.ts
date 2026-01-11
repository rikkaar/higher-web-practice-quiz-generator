import type {IEvents} from './base'
import type {EventsMap} from './event'

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
