import { useRouteLoaderData } from 'react-router-dom';

import { Exam } from '@/_data/exams';
import { Question } from '@/_data/questions';
import { Container, Heading } from '@/components/ui';
import { Header, QuestionCard } from '@/components/exam';

export const Result = () => {
  const { exam, questions, score, maxScore } = useRouteLoaderData('result') as {
    exam: Exam;
    questions: Question[];
    score: number;
    maxScore: number;
  };

  return (
    // Apply background gradient to the outer div
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      {/* Apply card styling to the Container */}
      <Container className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-3xl p-8">
        <Header title="Exam Result" />

        <main className="space-y-6 py-6">
          <div className="flex flex-col items-center justify-between mb-6 sm:flex-row">
            <Heading size="h2" className="mt-2 sm:mt-0 text-gray-800">
              {exam.name}
            </Heading>
            <div className="w-full rounded bg-gray-100 px-4 py-3 text-center sm:w-fit">
              <p className="text-sm text-gray-600">Your Score</p>
              <p className="text-lg font-bold text-gray-800">
                {score} / {maxScore}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </main>
      </Container>
    </div>
  );
};
