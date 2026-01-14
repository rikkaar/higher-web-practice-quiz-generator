import {View} from '../base'
import type {QuizHeaderViewData, QuizHeaderViewSettings} from '../../types'

export class QuizHeaderView extends View<QuizHeaderViewData, QuizHeaderViewSettings> {
	private title = this.ensure('.quiz__title')
	private description = this.ensure('.quiz__description')

	constructor(element: HTMLElement, settings: QuizHeaderViewSettings = {}) {
		super(element, settings)
	}

	render(data: QuizHeaderViewData): HTMLElement {
		this.title.textContent = data.title
		this.description.textContent = data.description

		return this.element
	}
}
