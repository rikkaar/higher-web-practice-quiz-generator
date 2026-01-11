import {ensureElement} from '../utils/dom'
import {quizDatabase} from '../utils/storage'
import {HeaderView, QuizGeneratorView} from '../components/view'
import {events} from '../components/base'
import {EVENTS} from '../types'
import {ToastView} from '../components/view'
import {QuizGeneratorModel} from '../components/model'

new HeaderView(ensureElement('.header'))
const generatorView = new QuizGeneratorView(ensureElement('.generator'), {events})
const generatorModel = new QuizGeneratorModel(quizDatabase, events)
const toastView = new ToastView(ensureElement('.toast'), {events})

events.on(EVENTS.QUIZ_FORM_SUBMIT, ({value}) => {
	void generatorModel.submitQuiz(value)
})

events.on(EVENTS.QUIZ_SAVE_SUCCESS, () => {
	window.location.href = './quizzes.html'
})

events.on(EVENTS.QUIZ_SAVE_FAILED, ({error}) => {
	console.error('Quiz save failed', error)
	toastView.render({
		title: 'Ошибка: не удалось сохранить квиз.',
		message: 'Произошла ошибка при сохранении в базу данных.',
		isVisible: true,
	})
	generatorView.render({isValid: false})
})

events.on(EVENTS.QUIZ_VALIDATION_FAILED, ({error}) => {
	console.error('Quiz validation failed', error)
	toastView.render({
		title: 'Ошибка: не удалось обработать JSON.',
		message: 'Проверьте формат данных и попробуйте снова.',
		isVisible: true,
	})
	generatorView.render({isValid: false})
})

events.on(EVENTS.TOAST_FIRE, () => {
	toastView.render({isVisible: false})
	generatorView.render({isValid: true})
})
