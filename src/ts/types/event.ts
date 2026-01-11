export interface ErrorEvent {
	error: string
}

export const EVENTS = {
	ERROR: 'error',
} as const

export interface EventsMap {
	[EVENTS.ERROR]: ErrorEvent
}
