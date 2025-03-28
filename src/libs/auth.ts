import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { authProvider } from '@/providers/auth'

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData()
  const username = formData.get('username') as string | null
  const password = formData.get('password') as string | null

  // Validate our form inputs and return validation errors via useActionData()
  if (!username || !password) {
    return {
      error: 'You must provide a username and password to log in!',
    }
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signin(username, password)
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      }
    }

    return {
      error: 'Something went wrong during login!',
    }
  }

  return redirect('/dashboard')
}

export const signupAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData()
  const username = formData.get('username') as string | null
  const password = formData.get('password') as string | null
  const confirmPassword = formData.get('confirmPassword') as string | null

  // Basic validation
  if (!username || !password || !confirmPassword) {
    return {
      error: 'All fields are required!',
    }
  }

  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match!',
    }
  }

  // Attempt signup
  try {
    await authProvider.signup(username, password)
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message, // e.g., "Username already exists!"
      }
    }
    return {
      error: 'Something went wrong during signup!',
    }
  }

  // Redirect to dashboard on successful signup
  return redirect('/dashboard')
}

export const loginLoader = () => {
  if (authProvider.isAuthenticated) {
    return redirect('/dashboard')
  }
  return null
}

export const protectedLoader = () => {
  if (!authProvider.isAuthenticated) {
    return redirect('/login')
  }
  return { username: authProvider.username }
}

export const logoutAction = async () => {
  await authProvider.signout()
  return redirect('/')
}
