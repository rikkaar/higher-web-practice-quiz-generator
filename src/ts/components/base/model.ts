import type {EventsMap, IEvents, IModel} from '@/ts/types'

export abstract class Model<T extends object = EventsMap> implements IModel<T> {
	protected events: IEvents<T>

	constructor(events: IEvents<T>) {
		this.events = events
	}

	emitChanges<K extends keyof T>(event: K, payload: T[K]): void {
		this.events.emit(event, payload)
	}
}
