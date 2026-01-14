import type {EventsMap, IEvents, IModel} from '@/ts/types'

export abstract class Model implements IModel<EventsMap> {
	protected events: IEvents<EventsMap>

	constructor(events: IEvents<EventsMap>) {
		this.events = events
	}

	emitChanges<K extends keyof EventsMap>(event: K, payload?: EventsMap[K]): void {
		this.events.emit(event, payload)
	}
}
