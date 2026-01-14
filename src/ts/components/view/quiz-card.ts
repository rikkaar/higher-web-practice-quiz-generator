import {View} from '../base'
import type {IEvents, EventsMap, QuizCardViewData, QuizCardViewSettings, QuizRecord} from '../../types'
import {EVENTS} from '../../types'
import {plural} from '@/ts/utils/plural'

export class QuizCardView extends View<QuizCardViewData, QuizCardViewSettings> {
	private id: string | null = null
	private events: IEvents<EventsMap>
	private title = this.ensure('.quiz-card__title')
	private description = this.ensure('.quiz-card__description')
	private count = this.ensure('.quiz-card__count')
	private action = this.ensure('.quiz-card__action')

	constructor(element: HTMLElement, settings: QuizCardViewSettings) {
		super(element, settings)

		this.events = settings.events

		this.action.addEventListener('click', (event) => {
			event.preventDefault()
			if (!this.id) throw new Error('QuizCardView: id is required')
			this.events.emit(EVENTS.QUIZ_START, {id: this.id})
		})
	}

	render(data: QuizRecord): HTMLElement {
		this.id = data.id
		this.title.textContent = data.title
		this.description.textContent = data.description
		this.count.textContent = `${data.questions.length} ${plural(data.questions.length, ['вопрос', 'вопроса', 'вопросов'])}`
		return this.element
	}
}
