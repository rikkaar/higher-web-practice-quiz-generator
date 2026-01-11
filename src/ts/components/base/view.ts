import type {DisableableElement, ElementValue, SelectorElement} from '@/ts/types/dom'
import {ensureElement, isChildElement, isPlainObject, isSelector} from '@/ts/utils/dom'
import type {IView} from '@/ts/types/base'

export abstract class View<T, S extends object = object, E extends HTMLElement = HTMLElement> implements IView<
	T,
	S,
	E
> {
	element: E
	protected settings: S
	protected cache: Record<string, HTMLElement> = {};

	['constructor']!: new (element: HTMLElement, settings: S) => this

	constructor(element: E, settings: S) {
		this.element = element
		this.settings = settings
	}

	render(data?: Partial<T>): E {
		if (data && typeof data === 'object') {
			Object.assign(this, data)
		}
		return this.element
	}

	copy(settings?: Partial<S>): this {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {}),
		)
	}

	protected ensure<T extends HTMLElement>(query: SelectorElement<T>, root: HTMLElement = this.element): T {
		if (!isSelector(query)) {
			return ensureElement(query)
		}
		if (!this.cache[query]) {
			this.cache[query] = ensureElement(query, root)
		}
		return this.cache[query] as T
	}

	protected setImage(query: SelectorElement<HTMLImageElement>, src: string, alt?: string): void {
		const el = this.ensure(query)
		el.src = src
		el.alt = alt ?? ''
	}

	protected setDisabled(query: SelectorElement<DisableableElement>, disabled: boolean): void {
		const el = this.ensure(query)
		el.disabled = disabled
	}

	protected toggleClass(query: SelectorElement<HTMLElement>, className: string, force?: boolean): void {
		const el = this.ensure(query)
		el.classList.toggle(className, force)
	}

	protected setValue<T extends HTMLElement>(query: SelectorElement<T>, value: ElementValue<T>): void {
		const el = this.ensure(query)
		if (typeof value === 'string') {
			el.textContent = value
		} else if (isChildElement(value)) {
			el.replaceChildren(...(Array.isArray(value) ? value : [value]))
		} else if (isPlainObject(value)) {
			Object.assign(el, value)
		}
	}
}
