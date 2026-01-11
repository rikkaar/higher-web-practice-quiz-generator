import {View} from '../base'
import type {QuizzesViewData, QuizzesViewSettings} from '../../types'

export class QuizzesView extends View<QuizzesViewData, QuizzesViewSettings> {
	private title = this.ensure('.quizzes__title')
	private grid = this.ensure('.quizzes__grid')
	private empty = this.ensure('.quizzes__empty')

	constructor(element: HTMLElement, settings: QuizzesViewSettings) {
		super(element, settings)
	}

	render(data: QuizzesViewData): HTMLElement {
		const hasItems = data.cards.length > 0

		this.title.hidden = !hasItems
		this.empty.hidden = hasItems

		this.grid.replaceChildren(...data.cards)

		return this.element
	}
}
