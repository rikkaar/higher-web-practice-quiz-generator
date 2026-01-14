import {View} from '../base'
import type {QuizHeadViewData, QuizHeadViewSettings} from '../../types'

export class QuizHeadView extends View<QuizHeadViewData, QuizHeadViewSettings> {
	private title = this.ensure('.quiz__title')
	private description = this.ensure('.quiz__description')

	constructor(element: HTMLElement, settings: QuizHeadViewSettings = {}) {
		super(element, settings)
	}

	render(data: QuizHeadViewData): HTMLElement {
		this.title.textContent = data.title
		this.description.textContent = data.description

		return this.element
	}
}
