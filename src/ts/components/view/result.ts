import {View} from '../base'
import type {IEvents, EventsMap, ResultViewData, ResultViewSettings} from '../../types'
import {EVENTS} from '../../types'

export class ResultView extends View<ResultViewData, ResultViewSettings> {
	private events: IEvents<EventsMap>
	private title = this.ensure('.result__title')
	private subtitle = this.ensure('.result__subtitle')
	private message = this.ensure('.result__message')
	private restartButton = this.ensure<HTMLButtonElement>('.result__restart')

	constructor(element: HTMLElement, settings: ResultViewSettings) {
		super(element, settings)

		this.events = settings.events
		this.restartButton.addEventListener('click', () => {
			this.events.emit(EVENTS.QUIZ_RESTART)
		})
	}

	render(data: ResultViewData): HTMLElement {
		if (data.data) {
			this.title.textContent = data.data.title
			this.subtitle.textContent = data.data.subtitle
			this.message.textContent = data.data.message
		}

		this.toggleResult(data.isOpen)

		return this.element
	}

	private toggleResult(isOpen: boolean): void {
		this.element.hidden = !isOpen
	}
}
