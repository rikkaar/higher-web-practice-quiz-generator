import {View} from '../base/view'
import type {HeaderViewData, HeaderViewSettings} from '../../types/view'
import {ensureAllElements} from '@/ts/utils/dom'

export class HeaderView extends View<HeaderViewData, HeaderViewSettings> {
	private menuButton = this.ensure('.header__menu-button')
	private menuIcon = this.ensure<HTMLImageElement>('.header__menu-icon')
	private menuContainer = this.ensure('.header__menu-container')

	constructor(element: HTMLElement, settings: HeaderViewSettings = {}) {
		super(element, settings)

		this.menuButton.addEventListener('click', () => this.toggle())

		const menuLinks = ensureAllElements('.header__menu-link', this.menuContainer)
		menuLinks.forEach((link) => {
			link.addEventListener('click', () => this.close())
		})
	}

	private get isOpen(): boolean {
		return this.menuContainer.classList.contains('header__menu-container--open')
	}

	private toggle(): void {
		this.setIsOpen(!this.isOpen)
	}

	private setIsOpen(isOpen?: boolean): void {
		if (isOpen) {
			this.open()
		} else {
			this.close()
		}
	}

	private open(): void {
		this.setImage(this.menuIcon, './assets/cross.svg', 'Закрыть меню')
		this.menuContainer.classList.add('header__menu-container--open')
	}

	private close(): void {
		this.setImage(this.menuIcon, './assets/burger.svg', 'Открыть меню')
		this.menuContainer.classList.remove('header__menu-container--open')
	}
}
