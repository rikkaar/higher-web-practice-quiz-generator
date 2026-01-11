import type {EventsMap, IEvents, Subscriber} from '@/ts/types'

class EventEmitter<T extends object> implements IEvents<T> {
	private events: Map<keyof T, Set<Subscriber<T, keyof T>>>

	constructor() {
		this.events = new Map()
	}

	on<K extends keyof T>(eventName: K, callback: Subscriber<T, K>): void {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, new Set())
		}
		this.events.get(eventName)!.add(callback as Subscriber<T, keyof T>)
	}

	off<K extends keyof T>(eventName: K, callback: Subscriber<T, K>): void {
		const subscribers = this.events.get(eventName)
		if (!subscribers) return

		subscribers.delete(callback as Subscriber<T, keyof T>)

		if (subscribers.size === 0) {
			this.events.delete(eventName)
		}
	}

	emit<K extends keyof T>(eventName: K, data: T[K]): void {
		this.events.get(eventName)?.forEach((callback) => {
			callback(data)
		})
	}

	offAll(): void {
		this.events.clear()
	}
}

export const events = new EventEmitter<EventsMap>()
