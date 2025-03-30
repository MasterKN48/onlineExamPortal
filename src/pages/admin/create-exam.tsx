import { Form } from 'react-router-dom';
import { Button, Heading, Input } from '@/components/ui';

export const CreateExamPage = () => {
    // TODO: Add state for form inputs if needed for validation before submission
    // TODO: Implement the actual form submission logic (action)

    return (
        <div>
            <Heading>Create New Exam</Heading>
            <Form method="post" className="mt-4 space-y-4 max-w-lg">
                <Input label="Exam Name" id="examName" name="examName" required />
                <Input label="Duration (minutes)" id="duration" name="duration" type="number" required min="1" />
                {/* Using textarea for rules */}
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
        </div>
    );
};