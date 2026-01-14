export function getResultData(correctCount: number, total: number) {
	const ratio = total > 0 ? correctCount / total : 0

	if (ratio === 1) {
		return {
			title: 'Тест завершён!',
			subtitle: `Вы ответили правильно на все вопросы 🎉`,
			message: `Ваши знания на высоте - вы уверенно разбираетесь в теме`,
		}
	}

	if (ratio > 0.5) {
		return {
			title: 'Хороший результат!',
			subtitle: `Вы ответили правильно на ${correctCount} из ${total} вопросов`,
			message: `Отличная попытка! Вы хорошо понимаете подход, но некоторые темы стоит освежить. Пройдите тест ещё раз, чтобы закрепить знания.`,
		}
	}

	return {
		title: 'Не расстраивайтесь!',
		subtitle: `Вы ответили правильно только на ${correctCount} из ${total} вопросов`,
		message: `Не переживайте - ошибки это часть обучения. Попробуйте пройти тест снова, чтобы закрепить материал и улучшить результат.`,
	}
}
