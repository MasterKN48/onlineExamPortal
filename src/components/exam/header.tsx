import { Heading } from '@/components/ui'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

interface HeaderProps {
  title: string;
  handleFinish?: () => void;
}

export const Header = ({ title, handleFinish }: HeaderProps) => (
  <header className="flex flex-col-reverse items-center justify-between border-b border-gray-700 py-4 sm:flex-row">
    <Heading className="mt-2 sm:mt-0">{title}</Heading>
    <div className="flex space-x-2">
      <Link
        to="/dashboard"
        className="w-full rounded bg-gray-400 bg-opacity-50 px-4 py-2 text-center font-medium transition-colors hover:bg-opacity-100 sm:w-fit"
      >
        Back to Dashboard
      </Link>
      {handleFinish && (
        <Button color="green" onClick={handleFinish}>
          Finish Exam
        </Button>
      )}
    </div>
  </header>
)
