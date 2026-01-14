import {View} from '../base'
import type {EventsMap, IEvents, QuizContentViewData, QuizContentViewSettings} from '../../types'
import {EVENTS} from '../../types'

export class QuizContentView extends View<QuizContentViewData, QuizContentViewSettings> {
	private events: IEvents<EventsMap>
	private questionContainer = this.ensure('.quiz__question')
	private form = this.ensure<HTMLFormElement>('.quiz__form')
	private submitButton = this.ensure<HTMLButtonElement>('.quiz__submit')
	private nextButton = this.ensure<HTMLButtonElement>('.quiz__next')

	constructor(element: HTMLElement, settings: QuizContentViewSettings) {
		super(element, settings)

		this.events = settings.events

		this.form.addEventListener('submit', (event) => {
			event.preventDefault()
			const answer = new FormData(this.form).getAll('question').map(String)
			this.events.emit(EVENTS.QUIZ_SUBMIT_ANSWER, {answer})
		})

		this.nextButton.addEventListener('click', () => {
			this.events.emit(EVENTS.QUIZ_NEXT)
		})

		this.form.addEventListener('change', () => {
			this.updateSubmitButtonState()
		})
	}

	private updateSubmitButtonState(): void {
		const hasAnswer = new FormData(this.form).getAll('question').length > 0
		this.submitButton.disabled = !hasAnswer
	}

	render(data: QuizContentViewData): HTMLElement {
		this.questionContainer.replaceChildren(data.questionElement)

		this.submitButton.hidden = !data.showSubmit
		this.nextButton.hidden = !data.showNext

		if (data.nextLabel) {
			this.nextButton.textContent = data.nextLabel
		}

		if (data.showSubmit) {
			this.form.reset()
			this.updateSubmitButtonState()
		}

		return this.element
	}
}
