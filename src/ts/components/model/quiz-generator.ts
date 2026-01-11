import {Model} from '../base'
import type {EventsMap, IEvents, IQuizDatabase} from '../../types'
import {EVENTS} from '../../types'
import {validateQuiz} from '../../utils/validateQuiz'
import {extractError} from '../../utils/extractError'

export class QuizGeneratorModel extends Model {
	private db: IQuizDatabase

	constructor(db: IQuizDatabase, events: IEvents<EventsMap>) {
		super(events)
		this.db = db
	}

	async submitQuiz(jsonString: string): Promise<void> {
		const result = validateQuiz(jsonString)

		if (!result.isValid) {
			return this.emitChanges(EVENTS.QUIZ_VALIDATION_FAILED, {
				error: result.error,
			})
		}

		try {
			await this.db.saveQuiz(result.data)
			this.emitChanges(EVENTS.QUIZ_SAVE_SUCCESS)
		} catch (error) {
			this.emitChanges(EVENTS.QUIZ_SAVE_FAILED, {error: extractError(error)})
		}
	}
}
