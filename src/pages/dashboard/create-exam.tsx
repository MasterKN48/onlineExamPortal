import { Heading, Input, Button } from '@/components/ui';
import { Form } from 'react-router-dom';

export const CreateExamPage = () => {
    return (
        <>
            <Heading size="h2">Create New Exam</Heading>
            <Form method="post" action="/dashboard/create-exam" className="mt-4 space-y-4 max-w-lg">
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
        </>
    );
};