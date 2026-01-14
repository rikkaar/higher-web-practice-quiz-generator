import {View} from '../base'
import type {QuizSectionViewData, QuizSectionViewSettings} from '../../types'

export class QuizSectionView extends View<QuizSectionViewData, QuizSectionViewSettings> {
	constructor(element: HTMLElement, settings: QuizSectionViewSettings = {}) {
		super(element, settings)
	}

	render(data: QuizSectionViewData): HTMLElement {
		this.element.hidden = !data.isVisible
		return this.element
	}
}
