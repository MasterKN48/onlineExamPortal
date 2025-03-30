import { Outlet, useFetcher, useRouteLoaderData } from 'react-router-dom';
import { Navigation } from '@/components/dashboard';
import { Button, Container } from '@/components/ui';
import { Avatar } from '@/components/ui/avatar';

export const Dashboard = () => {
  const { username, } = useRouteLoaderData('dashboard') as { username: string, isAdmin: boolean };
  const fetcher = useFetcher();
  const isLoggingOut = fetcher.formData != null;



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      <Container className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <p className="text-xl font-medium text-gray-800">
              👋 Hello, <strong>{username}</strong>!
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="mr-2">
              <Avatar name={username.charAt(0)} />
            </div>
            <fetcher.Form method="post" action="/logout">
              <Button type="submit" color="red" disabled={isLoggingOut}>
                {isLoggingOut ? 'Logging out...' : 'Logout'}</Button>
            </fetcher.Form>
          </div>
        </header>

        <main className="flex flex-col sm:flex-row flex-grow overflow-hidden">
          <div className="flex-shrink-0 sm:w-64 border-r border-gray-200 bg-gray-50 overflow-y-auto">
            <Navigation />
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </Container>
    </div>
  );
};
