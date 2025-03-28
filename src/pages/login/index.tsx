import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { Home } from 'lucide-react'; // Import Home icon

import { Button, Container, Heading, Input } from '@/components/ui';

export const LoginPage = () => {
  const navigation = useNavigation();
  const isLoggingIn =
    navigation.formData?.get('username') != null &&
    navigation.formData?.get('password') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    // Apply background gradient to the outer div
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Apply card styling to the Container, increase max-width */}
      <Container className="relative w-[70vw] flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-xl max-w-xl">
        {/* Home icon link */}
        <Link to="/" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <Home size={24} />
        </Link>

        <Heading>Login Page</Heading>
        <p className="text-lg text-gray-700">Welcome back! Please log in.</p>
        <Form method="post" className="flex w-full flex-col" replace>
          <Input
            label="Username"
            id="username"
            name="username"
            className="mb-4"
            placeholder="Enter your username"
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            className="mb-4"
            placeholder="Enter your password"
          />
          {actionData && actionData.error ? (
            <p className="mb-4 rounded bg-red-300 px-3 py-2 text-red-900">
              {actionData.error}
            </p>
          ) : null}
          <Button type="submit" color="green" disabled={isLoggingIn} className="py-3 text-lg">
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </Container>
    </div>
  );
};
