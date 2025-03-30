// Import data from JSON files
import examsData from '@/_data/exams.json'
import questionsData from '@/_data/questions.json'

import { shuffle } from '@/utils/array'

// Define interfaces locally
export interface Exam {
  id: number
  name: string
  duration: number
  rules: string
}

export interface Question {
  id: number
  content: string
  answers: { id: number; text: string }[]
  correctAnswer: number
  selectedAnswer?: number // Optional, used in result calculation
  hasPrev?: boolean // Optional, used in navigation
  hasNext?: boolean // Optional, used in navigation
}

export interface ExamProvider {
  // Exam
  getExams(): Omit<Exam, 'rules'>[]
  getExamById(examId: number): Exam | undefined
  saveEndTimeExam(examId: number, duration: number): void
  getEndTimeExam(examId: number): string | undefined
  clearEndTimeExam: (examId: number) => void
  addExam(exam: Exam): void // New method to add an exam

  // Question
  getQuestions(): Question[]
  getQuestionById(
    questionId: number,
  ): Omit<Question, 'correctAnswer'> | undefined
  addQuestion(question: Question): void // New method to add a question

  // Answer
  saveAnswer(examId: number, questionId: number, answerId: number): void
  getAnswer(examId: number, questionId: number): string | undefined
  clearAnswers: (examId: number) => void
}

// Cache keys
const EXAMS_CACHE_KEY = 'exams'
const QUESTIONS_CACHE_KEY = 'questions'

// Helper function to load data from cache
const loadFromCache = async (key: string): Promise<string | null> => {
  try {
    const cache = await caches.open('exam-data')
    const cachedResponse = await cache.match(key)
    if (!cachedResponse || !cachedResponse.ok) {
      return null
    }
    return await cachedResponse.text()
  } catch (error) {
    console.error('Error loading from cache:', error)
    return null
  }
}

// Helper function to save data to cache
const saveToCache = async (key: string, data: string): Promise<void> => {
  try {
    const cache = await caches.open('exam-data')
    const response = new Response(data)
    await cache.put(key, response)
  } catch (error) {
    console.error('Error saving to cache:', error)
  }
}

// Initialize data from cache or JSON files
let exams: Exam[] = []
let questions: Question[] = []

const initializeData = async () => {
  // Load exams
  const cachedExams = await loadFromCache(EXAMS_CACHE_KEY)
  exams = cachedExams ? JSON.parse(cachedExams) : examsData
  if (!cachedExams) {
    await saveToCache(EXAMS_CACHE_KEY, JSON.stringify(exams))
  }

  // Load questions
  const cachedQuestions = await loadFromCache(QUESTIONS_CACHE_KEY)
  questions = cachedQuestions ? JSON.parse(cachedQuestions) : questionsData
  if (!cachedQuestions) {
    await saveToCache(QUESTIONS_CACHE_KEY, JSON.stringify(questions))
  }
}

// Call initializeData (IIFE)
;(async () => {
  await initializeData()
})()

export const examProvider: ExamProvider = {
  // Exam
  getExams: () => {
    return exams.map((exam) => ({
      id: exam.id,
      name: exam.name,
      duration: exam.duration,
    }))
  },
  getExamById: (examId: number) => {
    return exams.find((exam) => exam.id === examId)
  },
  saveEndTimeExam: (examId: number, duration: number) => {
    const endTime = new Date().getTime() + duration * 60 * 1000
    localStorage.setItem(`end-exam-${examId}`, endTime.toString())
  },
  getEndTimeExam: (examId: number) => {
    const endTime = localStorage.getItem(`end-exam-${examId}`)
    return endTime ?? undefined
  },
  clearEndTimeExam: (examId: number) => {
    localStorage.removeItem(`end-exam-${examId}`)
  },
  addExam: async (exam: Exam) => {
    exams.push(exam)
    await saveToCache(EXAMS_CACHE_KEY, JSON.stringify(exams))
  },

  // Question
  getQuestions: () => questions,
  getQuestionById: (questionId: number) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return undefined

    return {
      id: question.id,
      answers: shuffle(question.answers),
      content: question.content,
      hasPrev: question.id > 1,
      hasNext: question.id < questions.length,
    }
  },
  addQuestion: async (question: Question) => {
    questions.push(question)
    await saveToCache(QUESTIONS_CACHE_KEY, JSON.stringify(questions))
  },

  // Answer
  saveAnswer: (examId: number, questionId: number, answerId: number) => {
    localStorage.setItem(`answer-${examId}-${questionId}`, answerId.toString())
  },
  getAnswer: (examId: number, questionId: number) => {
    const answer = localStorage.getItem(`answer-${examId}-${questionId}`)
    return answer ?? undefined
  },
  clearAnswers: (examId: number) => {
    questions.forEach((question) => {
      localStorage.removeItem(`answer-${examId}-${question.id}`)
    })
  },
}
