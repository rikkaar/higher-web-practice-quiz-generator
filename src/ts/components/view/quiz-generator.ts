import {View} from '../base/view'
import type {IEvents, EventsMap, QuizGeneratorViewData, QuizGeneratorViewSettings} from '../../types'
import {EVENTS} from '../../types'

export class QuizGeneratorView extends View<QuizGeneratorViewData, QuizGeneratorViewSettings> {
	private events: IEvents<EventsMap>
	private form = this.ensure<HTMLFormElement>('.generator__form')
	private textarea = this.ensure<HTMLTextAreaElement>('#quiz-json-input')

	constructor(element: HTMLElement, settings: QuizGeneratorViewSettings) {
		super(element, settings)

		this.events = settings.events

		this.form.addEventListener('submit', (event) => {
			event.preventDefault()
			this.events.emit(EVENTS.QUIZ_FORM_SUBMIT, {value: this.textarea.value})
		})

		this.textarea.addEventListener('input', () => {
			this.textarea.classList.remove('generator__textarea--error')
		})
	}

	render(data: QuizGeneratorViewData): HTMLElement {
		if (data.value !== undefined) {
			this.textarea.value = data.value
		}
		if (data.isValid !== undefined) {
			this.textarea.classList.toggle('generator__textarea--error', !data.isValid)
		}
		return this.element
	}
}
