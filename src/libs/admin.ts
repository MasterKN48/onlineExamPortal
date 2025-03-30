import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { examProvider } from '@/providers/exam'

export const deleteExamAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const examId = Number(formData.get('examId'))

  try {
    // Delete the exam using the provider
    await examProvider.deleteExam(examId)

    // Redirect back to the dashboard
    return redirect('/dashboard')
  } catch (error) {
    console.error('Error deleting exam:', error)
    return { error: 'Failed to delete exam.' }
  }
}
