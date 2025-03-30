import { Heading, Input, Button } from '@/components/ui';
import { examProvider, Exam, Question } from '@/providers/exam';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

export const AdminDashboard = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [expandedExamId, setExpandedExamId] = useState<number | null>(null); // Track expanded exam
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const loadExams = async () => {
            const examsData = examProvider.getExams();
            setExams(examsData.map(exam => ({ ...exam, rules: '' }))); // Map to Exam[]
        };

        loadExams();
    }, []);

    const handleExamClick = (examId: number) => {
        setExpandedExamId(expandedExamId === examId ? null : examId); // Toggle expand
        const questionsForExam = examProvider.getQuestions(); // In real app, filter questions by examId
        setQuestions(questionsForExam);
    };

    return (
        <div>
            <Heading>Admin Dashboard</Heading>
            <p>Welcome to the admin area. Use the navigation to manage exams.</p>

            <Heading size="h2">Create New Exam</Heading>
            <Form method="post" action="/admin/create-exam" className="mt-4 space-y-4 max-w-lg">
                <Input label="Exam Name" id="examName" name="examName" required />
                <Input label="Duration (minutes)" id="duration" name="duration" type="number" required min="1" />
                <div>
                    <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">Exam Rules</label>
                    <textarea
                        id="rules"
                        name="rules"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <Button type="submit" color="green">Create Exam</Button>
            </Form>

            <h2>Exam List</h2>
            <ul>
                {exams.map((exam) => (
                    <li key={exam.id}>
                        <button onClick={() => handleExamClick(exam.id)}>
                            {exam.name} (Duration: {exam.duration} mins)
                        </button>
                        {expandedExamId === exam.id && ( // Conditionally render questions
                            <div>
                                <h3>Questions for Exam {exam.name}</h3>
                                {questions.length > 0 ? (
                                    <ul>
                                        {questions.map((question) => (
                                            <li key={question.id}>{question.content}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No questions available for this exam.</p>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};