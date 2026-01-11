import {View} from '../base'
import type {IEvents, EventsMap, ToastViewData, ToastViewSettings} from '../../types'
import {EVENTS} from '../../types'

export class ToastView extends View<ToastViewData, ToastViewSettings> {
	private events: IEvents<EventsMap>
	private title = this.ensure('.toast__title')
	private message = this.ensure('.toast__message')
	private actionButton = this.ensure<HTMLButtonElement>('.toast__action')

	constructor(element: HTMLElement, settings: ToastViewSettings) {
		super(element, settings)
		this.events = settings.events

		this.actionButton.addEventListener('click', () => {
			this.events.emit(EVENTS.TOAST_FIRE)
		})
	}

	render(data: ToastViewData): HTMLElement {
		if (data.title !== undefined) {
			this.title.textContent = data.title
		}
		if (data.message !== undefined) {
			this.message.textContent = data.message
		}
		if (data.action !== undefined) {
			this.actionButton.textContent = data.action
		}
		this.toggleToast(data.isVisible)
		return this.element
	}

	private toggleToast(isVisible: boolean): void {
		this.element.hidden = !isVisible
		this.element.classList.toggle('toast--visible', isVisible)
	}
}
