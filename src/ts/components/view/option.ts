import {View} from '../base'
import type {OptionResultData, OptionViewData, OptionViewSettings} from '../../types'

export class OptionView extends View<OptionViewData, OptionViewSettings> {
	private input = this.ensure<HTMLInputElement>('.option__input')
	private label = this.ensure<HTMLLabelElement>('.option__label')
	private text = this.ensure('.option__text')
	private message = this.ensure('.option__message')

	constructor(element: HTMLElement, settings: OptionViewSettings) {
		super(element, settings)
	}

	render(data: OptionViewData): HTMLElement {
		const {option, disabled, checked, result} = data

		this.input.value = String(option.id)
		this.input.disabled = disabled
		this.input.checked = checked

		this.text.textContent = option.text

		this.renderResult(result)

		return this.element
	}

	private renderResult(result?: OptionResultData): void {
		this.label.classList.remove('option__label--success', 'option__label--error')
		this.input.classList.remove('checkbox--success', 'checkbox--error', 'radio--success', 'radio--error')

		if (!result) {
			this.message.textContent = ''
			this.message.hidden = true
			return
		}

		this.message.hidden = false
		this.message.textContent = result.message

		const modifier = result.isCorrect ? 'success' : 'error'
		this.label.classList.add(`option__label--${modifier}`)

		if (this.input.classList.contains('checkbox')) {
			this.input.classList.add(`checkbox--${modifier}`)
		} else if (this.input.classList.contains('radio')) {
			this.input.classList.add(`radio--${modifier}`)
		}
	}
}
