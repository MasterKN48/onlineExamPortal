import clsx from 'clsx';
import { Home, User, Plus } from 'lucide-react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';

// Define menu types
interface MenuItem {
  Icon: React.ElementType;
  label: string;
  path: string;
  adminOnly?: boolean;
}

// Regular user menus
const userMenus: MenuItem[] = [
  {
    Icon: Home,
    label: 'Exams',
    path: '/dashboard',
  },
  {
    Icon: User,
    label: 'Profile',
    path: '/dashboard/profile',
  },
];

export const Navigation = () => {
  // Get isAdmin status from the dashboard loader data
  const { isAdmin } = useRouteLoaderData('dashboard') as { isAdmin: boolean };

  return (
    <nav className="pt-4">
      <ul className="space-y-2">
        {userMenus.map((menu) => (
          <li key={menu.label} className="font-medium">
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-2 rounded border-l-4 p-2 transition-colors hover:bg-gray-200',
                  isActive
                    ? 'border-purple-600 bg-purple-100 text-purple-800'
                    : 'border-transparent text-gray-700'
                )
              }
              end={menu.path === '/dashboard'}
            >
              <menu.Icon className="h-5 w-5" />
              <p>{menu.label}</p>
            </NavLink>
          </li>
        ))}
        {/* Conditionally render "Create Exam" button for admins */}
        {isAdmin && (
          <li>
            <NavLink
              to="/dashboard/create-exam"
              title="Create Exam"
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-2 rounded border-l-4 p-2 transition-colors hover:bg-gray-200 border-transparent text-gray-700',
                  isActive
                    ? 'border-purple-600 bg-purple-100 text-purple-800'
                    : 'border-transparent text-gray-700'
                )
              }
              end
            >
              <Plus className="h-5 w-5" />
              <p>Create Exam</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
