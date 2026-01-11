import {type IDBPDatabase, type StoreNames, openDB} from 'idb'
import {nanoid} from 'nanoid'
import type {QuizData, QuizDB, QuizRecord, IQuizDatabase} from '../types'

class QuizDatabase implements IQuizDatabase {
	private readonly storeName: StoreNames<QuizDB> = 'quizzes'
	private readonly dbPromise: Promise<IDBPDatabase<QuizDB>>

	constructor() {
		const storeName = this.storeName
		this.dbPromise = openDB<QuizDB>('quizzes-db', 1, {
			upgrade(db) {
				db.createObjectStore(storeName, {keyPath: 'id'})
			},
		})
	}

	async getAllQuizzes() {
		const db = await this.dbPromise
		return db.getAll(this.storeName)
	}

	async getQuiz(id: string) {
		const db = await this.dbPromise
		return db.get(this.storeName, id)
	}

	async saveQuiz(quizData: QuizData) {
		const db = await this.dbPromise
		return db.put(this.storeName, {...quizData, id: nanoid()} as QuizRecord)
	}

	async deleteQuiz(id: string) {
		const db = await this.dbPromise
		return db.delete(this.storeName, id)
	}

	async clearAllQuizzes() {
		const db = await this.dbPromise
		return db.clear(this.storeName)
	}
}

export const quizDatabase = new QuizDatabase()
