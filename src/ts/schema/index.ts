import {z} from 'zod'

export const QuizOptionSchema = z.object({
	id: z.number(),
	text: z.string().min(1, 'Текст варианта не может быть пустым'),
	correct: z.boolean(),
	message: z.string().min(1, 'Сообщение не может быть пустым'),
})

export const QuizQuestionSchema = z.object({
	id: z.number(),
	text: z.string().min(1, 'Текст вопроса не может быть пустым'),
	type: z.enum(['single', 'multiple']),
	options: z.array(QuizOptionSchema).min(2, 'Должно быть минимум 2 варианта ответа'),
})

export const QuizSchema = z.object({
	title: z.string().min(1, 'Название квиза не может быть пустым'),
	description: z.string().min(1, 'Описание не может быть пустым'),
	questions: z.array(QuizQuestionSchema).min(1, 'Должен быть минимум 1 вопрос'),
})
