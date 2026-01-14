import {View} from '../base'
import type {QuizProgressViewData, QuizProgressViewSettings} from '../../types'

export class QuizProgressView extends View<QuizProgressViewData, QuizProgressViewSettings> {
	private progressText = this.ensure('.quiz__progress-text')
	private progressBar = this.ensure<HTMLProgressElement>('.quiz__progress-bar')

	constructor(element: HTMLElement, settings: QuizProgressViewSettings = {}) {
		super(element, settings)
	}

	render(data: QuizProgressViewData): HTMLElement {
		this.progressBar.max = data.total
		this.progressBar.value = data.currentIndex + 1
		this.progressText.textContent = `Вопрос ${data.currentIndex + 1} из ${data.total}`

		return this.element
	}
}
