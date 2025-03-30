import { Outlet } from 'react-router-dom';
import { Container } from '@/components/ui'; // Assuming Container is reusable

// Basic Admin Navigation (can be expanded)
import { Link } from 'react-router-dom';

const AdminNavigation = () => (
    <nav className="p-4 border-b border-gray-200 bg-gray-100">
        <ul className="flex space-x-4">
            <li><Link to="/dashboard" className="text-blue-600 hover:underline">Main Dashboard</Link></li> {/* Link to main dashboard */}
            <li><Link to="/admin" className="text-blue-600 hover:underline">Admin Dashboard</Link></li>
            <li><Link to="/admin/create-exam" className="text-blue-600 hover:underline">Create Exam</Link></li>
            {/* Add other admin links here */}
        </ul>
    </nav>
);

export const AdminLayout = () => {
    // Optionally use loader data if needed (e.g., display admin username)
    // const { username } = useRouteLoaderData('admin') as { username: string };

    return (
        // Apply consistent styling
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 p-4 sm:p-8">
            <Container className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] overflow-hidden">
                <AdminNavigation />
                <main className="flex-grow p-6 overflow-y-auto">
                    <Outlet /> {/* Renders the nested admin route components */}
                </main>
            </Container>
        </div>
    );
};