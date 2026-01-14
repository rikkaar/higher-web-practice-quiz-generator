import {cloneTemplateContent, ensureElement} from '../utils/dom'
import {quizDatabase} from '../utils/storage'
import {HeaderView} from '../components/view'
import {events} from '../components/base'
import {type QuizAnswerResult, type QuizQuestion, EVENTS} from '../types'
import {OptionView} from '../components/view/option'
import {QuestionView} from '../components/view/question'
import {QuizContentView} from '../components/view/quiz-content'
import {QuizProgressView} from '../components/view/quiz-progress'
import {QuizSectionView} from '../components/view/quiz-section'
import {QuizHeadView} from '../components/view/quiz-head'
import {QuizSessionModel} from '../components/model/quiz-session'
import {ResultView} from '../components/view/result'
import {getResultData} from '../utils/getResultData'

new HeaderView(ensureElement('.header'))

const quizId = new URLSearchParams(window.location.search).get('id')
if (!quizId) {
	window.location.href = './quizzes.html'
	throw new Error('Quiz: quiz id is required')
}

const quizContentView = new QuizContentView(ensureElement('.quiz__content'), {events})
const quizSectionView = new QuizSectionView(ensureElement('.quiz'))
const quizProgressView = new QuizProgressView(ensureElement('.quiz__progress'))
const quizHeadView = new QuizHeadView(ensureElement('.quiz__head'))
const resultView = new ResultView(ensureElement('.result'), {events})
const quizSessionModel = new QuizSessionModel(quizDatabase, events)

const singleQuestionTemplate = ensureElement<HTMLTemplateElement>('#single-question-template')
const multipleQuestionTemplate = ensureElement<HTMLTemplateElement>('#multiple-question-template')
const radioOptionTemplate = ensureElement<HTMLTemplateElement>('#option-template')
const checkboxOptionTemplate = ensureElement<HTMLTemplateElement>('#checkbox-option-template')

const templateRegistry = {
	single: {
		question: singleQuestionTemplate,
		option: radioOptionTemplate,
	},
	multiple: {
		question: multipleQuestionTemplate,
		option: checkboxOptionTemplate,
	},
} satisfies Record<QuizQuestion['type'], {question: HTMLTemplateElement; option: HTMLTemplateElement}>

function renderQuestion(question: QuizQuestion, answer?: string[], result?: QuizAnswerResult, isLast?: boolean) {
	const templates = templateRegistry[question.type]

	const hasResult = Boolean(result)

	const optionViews = question.options.map((option) => {
		const optionView = new OptionView(cloneTemplateContent(templates.option), {events})

		const optionFeedback = result?.options.find((feedback) => feedback.id === option.id)
		const isChecked = Boolean(answer?.includes(String(option.id)))

		optionView.render({
			option,
			disabled: hasResult,
			checked: isChecked,
			result: optionFeedback ? {message: optionFeedback.message, isCorrect: optionFeedback.isCorrect} : undefined,
		})

		return optionView
	})

	const optionElements = optionViews.map((view) => view.element)
	const questionView = new QuestionView(cloneTemplateContent(templates.question), {events})
	const questionElement = questionView.render({optionElements, text: question.text})

	quizContentView.render({
		questionElement,
		questionType: question.type,
		showSubmit: !hasResult,
		showNext: hasResult,
		nextLabel: isLast ? 'Завершить тест' : 'Следующий вопрос',
	})
}

events.on(EVENTS.QUIZ_LOAD_FAILED, ({error}) => {
	console.error('Quiz load failed', error)
	window.location.href = './quizzes.html'
})

events.on(EVENTS.QUIZ_SESSION_STARTED, ({title, description, total}) => {
	quizHeadView.render({title, description})
	quizProgressView.render({currentIndex: 0, total})
})

events.on(EVENTS.QUIZ_SESSION_UPDATED, ({question, currentIndex, total}) => {
	quizProgressView.render({currentIndex, total})
	renderQuestion(question)
})

events.on(EVENTS.QUIZ_ANSWER_RESULT, ({question, result, answer, isLast}) => {
	renderQuestion(question, answer, result, isLast)
})

events.on(EVENTS.QUIZ_SESSION_FINISHED, ({correctCount, total}) => {
	quizSectionView.render({isVisible: false})
	const data = getResultData(correctCount, total)
	resultView.render({data, isOpen: true})
})

events.on(EVENTS.QUIZ_SUBMIT_ANSWER, ({answer}) => {
	quizSessionModel.submitAnswer(answer)
})

events.on(EVENTS.QUIZ_NEXT, () => {
	quizSessionModel.goToNextQuestion()
})

events.on(EVENTS.QUIZ_RESTART, () => {
	quizSectionView.render({isVisible: true})
	resultView.render({isOpen: false})
	quizSessionModel.restart()
})

void quizSessionModel.startQuizSession(quizId)
