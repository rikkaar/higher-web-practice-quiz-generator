import {View} from '../base'
import type {QuestionViewData, QuestionViewSettings} from '../../types'

export class QuestionView extends View<QuestionViewData, QuestionViewSettings> {
	private readonly questionText = this.ensure('.question__text')
	private readonly optionsContainer = this.ensure('.question__options')

	constructor(element: HTMLElement, settings: QuestionViewSettings) {
		super(element, settings)
	}

	render(data: QuestionViewData): HTMLElement {
		this.questionText.textContent = data.text
		this.optionsContainer.replaceChildren(...data.optionElements)
		return this.element
	}
}
