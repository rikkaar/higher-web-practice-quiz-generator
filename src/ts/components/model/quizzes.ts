import {Model} from '../base'
import type {IEvents, EventsMap, IQuizDatabase, QuizRecord} from '../../types'
import {EVENTS} from '../../types'
import {extractError} from '@/ts/utils/extractError'

export class QuizzesModel extends Model {
	private db: IQuizDatabase

	constructor(db: IQuizDatabase, events: IEvents<EventsMap>) {
		super(events)
		this.db = db
	}

	async loadQuizzes(): Promise<QuizRecord[]> {
		try {
			const quizzes = await this.db.getAllQuizzes()
			this.emitChanges(EVENTS.QUIZZES_LOAD_SUCCESS, {quizzes})
			return quizzes
		} catch (error) {
			this.emitChanges(EVENTS.QUIZZES_LOAD_FAILED, {error: extractError(error)})
			return []
		}
	}
}
