import { useCallback, useEffect, useState } from 'react';
import {
  useFetcher,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';

import { Question as IQuestion } from '@/_data/questions';
import { Button, Container } from '@/components/ui';
import { AnswerOption, FinishModal } from '@/components/exam';
import { Header } from '@/components/exam'; // Import Header

import { examProvider } from '@/providers/exam';
import { formatDuration } from '@/utils/format';

export const Question = () => {
  const { question, answer, endTime } = useRouteLoaderData('question') as {
    question: Omit<IQuestion, 'correctAnswer'>;
    answer?: string;
    endTime: string;
  };
  const remainingTime = Number(endTime) - new Date().getTime();

  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(Math.floor(remainingTime / 1000));
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    answer
  );
  const params = useParams();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  // Get manually on mount, because useRouteLoaderData doesn't triggered on mount
  useEffect(() => {
    setSelectedAnswer(
      examProvider.getAnswer(Number(params.examId), question.id)
    );
  }, [params.examId, question.id]);

  const saveAnswer = useCallback(() => {
    // If no answer selected, don't save
    if (!selectedAnswer) {
      return;
    }

    examProvider.saveAnswer(
      Number(params.examId),
      question.id,
      Number(selectedAnswer)
    );
  }, [params.examId, question.id, selectedAnswer]);

  const handleFinish = useCallback(() => {
    saveAnswer();
    setShowModal(true);
  }, [saveAnswer]);

  const handleSubmit = () => {
    fetcher.submit(null, { method: 'post' });
  };

  // Handle finish when timer is 0
  useEffect(() => {
    if (timer <= 0) {
      handleFinish();
    }
  }, [timer, handleFinish]);

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    saveAnswer();
    navigate(`../${question.id - 1}`);
  };

  const handleNext = () => {
    saveAnswer();
    navigate(`../${question.id + 1}`);
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    // Apply background gradient to the outer div
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      {/* Apply card styling to the Container */}
      <Container className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-3xl p-8">
        <Header title={`Question ${question.id}`} /> {/* Use Header component */}

        {showModal && (
          <FinishModal
            setShowModal={setShowModal}
            submitHandler={handleSubmit}
            time={timer}
          />
        )}
        <header className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3">
          {question.hasPrev ? (
            <Button color="red" className="w-full" onClick={handlePrev}>
              Previous
            </Button>
          ) : (
            <div />
          )}
          <div className="place-self-center font-semibold text-gray-800">
            {/* Timer display */}
            <div className="mx-auto flex flex-col items-center space-y-1 rounded bg-gray-100 px-4 py-2">
              <p className="text-sm text-gray-600">Remaining Time</p>
              <time className="font-bold">{formatDuration(timer)}</time>
            </div>
          </div>
          <Button
            color="green"
            className="w-full"
            onClick={question.hasNext ? handleNext : handleFinish}
          >
            {question.hasNext ? 'Next' : 'Finish'}
          </Button>
        </header>

        <main className="space-y-6 py-6">
          <p className="text-lg font-medium text-gray-800">{question.content}</p>
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <AnswerOption
                key={answer.id}
                id={`answer-${answer.id}`}
                value={answer.id}
                label={answer.text}
                name="answer"
                onChange={handleChangeAnswer}
                checked={selectedAnswer === answer.id.toString()}
              />
            ))}
          </div>
        </main>
      </Container>
    </div>
  );
};
