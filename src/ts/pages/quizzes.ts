import {HeaderView, QuizCardView} from '../components/view'
import {cloneTemplateContent, ensureElement} from '../utils/dom'
import {quizDatabase} from '../utils/storage'
import {events} from '../components/base'
import {EVENTS} from '../types'
import {QuizzesView} from '../components/view/quizzes'
import {QuizzesModel} from '../components/model/quizzes'

new HeaderView(ensureElement('.header'))
const quizzesView = new QuizzesView(ensureElement('.quizzes'), {events})
const quizzesModel = new QuizzesModel(quizDatabase, events)

events.on(EVENTS.QUIZZES_LOAD_SUCCESS, ({quizzes}) => {
	const cards = quizzes.map((quiz) => {
		const cardElement = cloneTemplateContent(ensureElement<HTMLTemplateElement>('#quiz-card-template'))
		const card = new QuizCardView(cardElement, {events})
		return card.render(quiz)
	})
	quizzesView.render({cards})
})

events.on(EVENTS.QUIZZES_LOAD_FAILED, ({error}) => {
	console.error('Quizzes load failed', error)
	quizzesView.render({cards: []})
})

events.on(EVENTS.QUIZ_START, ({id}) => {
	window.location.href = `./quiz.html?id=${id}`
})

void quizzesModel.loadQuizzes()
