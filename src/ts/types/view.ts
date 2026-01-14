import type {IEvents} from './base'
import type {EventsMap} from './event'
import type {QuizOption, QuizQuestion, QuizRecord} from './quiz'

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

export type OptionResultData = {
	message: string
	isCorrect: boolean
}

export type OptionViewData = {
	option: QuizOption
	disabled: boolean
	checked: boolean
	result?: OptionResultData
}

export type OptionViewSettings = BaseViewSettings

export type QuestionViewData = {
	text: string
	optionElements: HTMLElement[]
}

export type QuestionViewSettings = BaseViewSettings

export type QuizContentViewData = {
	questionElement: HTMLElement
	questionType: QuizQuestion['type']
	showSubmit: boolean
	showNext: boolean
	nextLabel?: string
}

export type QuizContentViewSettings = BaseViewSettings

export type QuizProgressViewData = {
	currentIndex: number
	total: number
}

export type QuizProgressViewSettings = object

export type QuizSectionViewData = {
	isVisible: boolean
}

export type QuizSectionViewSettings = object

export type ResultViewData = {
	data?: {
		title: string
		subtitle: string
		message: string
	}
	isOpen: boolean
}

export type ResultViewSettings = BaseViewSettings

export type QuizHeaderViewData = {
	title: string
	description: string
}

export type QuizHeaderViewSettings = object
