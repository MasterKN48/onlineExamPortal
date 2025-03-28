import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { Home } from 'lucide-react'; // Import Home icon

import { Button, Container, Heading, Input } from '@/components/ui';

export const SignupPage = () => {
    const navigation = useNavigation();
    const isSigningUp = navigation.state === 'submitting';
    const actionData = useActionData() as { error: string } | undefined; // Get action data

    return (
        // Apply background gradient to the outer div
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* Apply card styling to the Container, increase max-width */}
            <Container className="relative w-[70vw] flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-xl max-w-xl">
                {/* Home icon link */}
                <Link to="/" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <Home size={24} />
                </Link>

                <Heading>Sign Up</Heading>
                <p className="text-lg text-gray-700">Create your account</p>
                <Form method="post" className="flex w-full flex-col">
                    <Input
                        label="Username"
                        id="username"
                        name="username"
                        className="mb-4"
                        placeholder="Enter your username"
                        required
                        autoComplete="username"
                    />
                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        className="mb-4"
                        placeholder="Enter your password"
                        required
                        autoComplete="new-password"
                    />
                    <Input
                        label="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="mb-4"
                        placeholder="Confirm your password"
                        required
                        autoComplete="new-password"
                    />
                    {/* Display error message if actionData contains an error */}
                    {actionData && actionData.error ? (
                        <p className="mb-4 rounded bg-red-300 px-3 py-2 text-red-900">
                            {actionData.error}
                        </p>
                    ) : null}
                    <Button type="submit" color="green" disabled={isSigningUp} className="py-3 text-lg">
                        {isSigningUp ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </Form>
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </Container>
        </div>
    );
};