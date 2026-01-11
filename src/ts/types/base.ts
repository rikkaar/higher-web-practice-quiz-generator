import type {EventsMap} from './event'

export interface IView<T, S = object, E extends HTMLElement = HTMLElement> {
	element: E
	copy(settings?: Partial<S>): IView<T, S, E>
	render(data?: Partial<T>): E
}

export interface IModel<T extends object = EventsMap> {
	emitChanges<K extends keyof T>(event: K, payload: T[K]): void
}

export type Subscriber<T extends object, K extends keyof T> = (event: T[K]) => void

export interface IEvents<T extends object> {
	on<K extends keyof T>(eventName: K, callback: Subscriber<T, K>): void
	off<K extends keyof T>(eventName: K, callback: Subscriber<T, K>): void
	emit<K extends keyof T>(eventName: K, data: T[K]): void
	offAll(): void
}
