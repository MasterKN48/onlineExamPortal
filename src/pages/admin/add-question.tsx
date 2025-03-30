import { Form, useParams } from 'react-router-dom';
import { Button, Heading, Input } from '@/components/ui';
import { useState } from 'react';

export const AddQuestionPage = () => {
    const { examId } = useParams();
    const [answers, setAnswers] = useState([{ id: 1, text: '' }, { id: 2, text: '' }]);
    const [correctAnswerId, setCorrectAnswerId] = useState(1);

    const addAnswerField = () => {
        setAnswers([...answers, { id: answers.length + 1, text: '' }]);
    };

    const handleAnswerChange = (id: number, text: string) => {
        setAnswers(answers.map(ans => ans.id === id ? { ...ans, text } : ans));
    };

    // TODO: Implement the actual form submission logic (action)

    return (
        <div>
            <Heading>Add Question to Exam {examId}</Heading>
            <Form method="post" className="mt-4 space-y-4 max-w-lg">
                <input type="hidden" name="examId" value={examId} />
                <div>
                    <label htmlFor="questionContent" className="block text-sm font-medium text-gray-700 mb-1">Question Content</label>
                    <textarea
                        id="questionContent"
                        name="questionContent"
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-gray-900">Answers</legend>
                    {answers.map((answer, index) => (
                        <div key={answer.id} className="flex items-center space-x-2">
                            <Input
                                id={`answer-${answer.id}`}
                                name={`answer-${answer.id}`} // Unique name for each answer input
                                label={`Answer ${index + 1}`}
                                value={answer.text}
                                onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
                                required
                                className="flex-grow"
                            />
                            <input
                                type="radio"
                                id={`correct-${answer.id}`}
                                name="correctAnswer"
                                value={answer.id}
                                checked={correctAnswerId === answer.id}
                                onChange={() => setCorrectAnswerId(answer.id)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label htmlFor={`correct-${answer.id}`} className="text-sm text-gray-700">Correct</label>
                        </div>
                    ))}
                    {/* Removed variant and size props as they are not supported */}
                    <Button type="button" onClick={addAnswerField}>
                        Add Another Answer
                    </Button>
                </fieldset>

                <Button type="submit" color="green">Add Question</Button>
            </Form>
        </div>
    );
};