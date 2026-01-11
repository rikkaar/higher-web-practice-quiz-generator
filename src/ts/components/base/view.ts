import type {SelectorElement} from '@/ts/types/dom'
import {ensureElement, isSelector} from '@/ts/utils/dom'
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

	render(data: Partial<T>): E {
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
}
