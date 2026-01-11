import type {SelectorCollection, SelectorElement} from '@/ts/types/dom'

export function isSelector(x: unknown): x is string {
	return typeof x === 'string' && x.length > 1
}

export function ensureAllElements<T extends HTMLElement>(
	selectorElement: SelectorCollection<T>,
	context: HTMLElement = document as unknown as HTMLElement,
): T[] {
	if (isSelector(selectorElement)) {
		return Array.from(context.querySelectorAll(selectorElement))
	}
	if (selectorElement instanceof NodeList) {
		return Array.from(selectorElement) as T[]
	}
	if (Array.isArray(selectorElement)) {
		return selectorElement
	}
	throw new Error(`Unknown selector element`)
}

export function ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement): T {
	if (isSelector(selectorElement)) {
		const elements = ensureAllElements<T>(selectorElement, context)
		if (elements.length > 1) {
			console.warn(`selector ${selectorElement} return more then one element`)
		}
		if (elements.length === 0) {
			throw new Error(`selector ${selectorElement} return nothing`)
		}
		return elements.pop() as T
	}
	if (selectorElement instanceof HTMLElement) {
		return selectorElement
	}
	throw new Error('Unknown selector element')
}

export function cloneTemplateContent<T extends HTMLElement>(template: HTMLTemplateElement): T {
	return template.content.firstElementChild?.cloneNode(true) as T
}
