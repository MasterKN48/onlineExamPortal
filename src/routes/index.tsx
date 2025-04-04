import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'

import { LoginPage } from '@/pages/login'
import { SignupPage } from '@/pages/signup' // Import SignupPage
import HomePage from '@/pages/home' // Import HomePage
import { Dashboard, Exams, Profile } from '@/pages/dashboard'
import { ExamInstruction, Question, Result } from '@/pages/exam'

import {
  loginAction,
  loginLoader,
  logoutAction,
  protectedLoader,
  signupAction, // Import signupAction
} from '@/libs/auth'
import {
  examAction,
  examLoader,
  examsLoader,
  indexQuestionLoader,
  questionAction,
  questionLoader,
  resultLoader,
} from '@/libs/exam'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
        loader: loginLoader,
        action: loginAction,
      },
      { // Add Signup Route
        path: 'signup',
        element: <SignupPage />,
        action: signupAction, // Assign the action
        // Add a loader similar to loginLoader if needed to redirect authenticated users
        loader: loginLoader, // Redirect if already logged in
      },
    ],
  },
  {
    id: 'dashboard',
    path: 'dashboard',
    element: <Dashboard />,
    loader: protectedLoader,
    children: [
      {
        id: 'exams',
        index: true,
        element: <Exams />,
        loader: examsLoader,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: 'exam',
    loader: protectedLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: ':examId',
        element: <Outlet />,
        children: [
          {
            id: 'exam',
            index: true,
            element: <ExamInstruction />,
            loader: examLoader,
            action: examAction,
          },
          {
            path: 'question',
            children: [
              {
                index: true,
                loader: indexQuestionLoader,
              },
              {
                id: 'question',
                path: ':questionId',
                element: <Question />,
                loader: questionLoader,
                action: questionAction,
              },
            ],
          },
          {
            id: 'result',
            path: 'result',
            element: <Result />,
            loader: resultLoader,
          },
        ],
      },
    ],
  },
  {
    path: 'logout',
    action: logoutAction,
  },
], {
  basename: '/onlineExamPortal',
})
