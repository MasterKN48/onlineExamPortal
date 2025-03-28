import { Form, useRouteLoaderData } from 'react-router-dom';

import { Exam } from '@/_data/exams';
import { Button, Container } from '@/components/ui';
import { Header } from '@/components/exam';

export const ExamInstruction = () => {
  const { exam, endTime } = useRouteLoaderData('exam') as {
    exam: Exam;
    endTime?: string;
  };

  return (
    // Apply background gradient to the outer div
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      {/* Apply card styling to the Container */}
      <Container className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
        <Header title="Exam Instructions" />

        <main className="space-y-6 py-6">
          <div>
            <p className="font-semibold text-gray-800">Exam Title</p>
            <p className="text-gray-700">{exam.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Exam Duration</p>
            <p className="text-gray-700">{exam.duration} minutes</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Exam Rules</p>
            <p className="text-gray-700">{exam.rules}</p>
          </div>
          <Form method="post" replace>
            <input type="hidden" name="examId" value={exam.id} />
            <input type="hidden" name="duration" value={exam.duration} />
            <input type="hidden" name="endTime" value={endTime} />
            <Button type="submit" color="green" className="w-full py-3 text-lg">
              {`${endTime ? 'Resume' : 'Start'} Exam`}
            </Button>
          </Form>
        </main>
      </Container>
    </div>
  );
};
