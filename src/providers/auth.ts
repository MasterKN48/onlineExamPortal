interface UserCredentials {
  username: string
  password: string // In a real app, NEVER store plain text passwords! Hash them.
}

export interface AuthProvider {
  isAuthenticated: boolean
  username: null | string
  signin(username: string, password: string): Promise<void>
  signup(username: string, password: string): Promise<void> // Added signup
  signout(): Promise<void>
}

// Helper function to get users from localStorage
const getRegisteredUsers = (): UserCredentials[] => {
  const usersJson = localStorage.getItem('registeredUsers')
  return usersJson ? JSON.parse(usersJson) : []
}

// Helper function to save users to localStorage
const saveRegisteredUsers = (users: UserCredentials[]) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users))
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authProvider: AuthProvider = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  username: localStorage.getItem('username') || null,

  async signin(username: string, password: string) {
    await new Promise((r) => setTimeout(r, 500)) // fake delay

    const users = getRegisteredUsers()
    const user = users.find(
      (u) => u.username === username && u.password === password, // Simple check
    )

    if (!user) {
      throw new Error('Invalid username or password!')
    }

    authProvider.isAuthenticated = true
    authProvider.username = username

    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', username)
  },

  async signup(username: string, password: string) {
    await new Promise((r) => setTimeout(r, 500)) // fake delay

    const users = getRegisteredUsers()

    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      throw new Error('Username already exists!')
    }

    // Add new user
    const newUser: UserCredentials = { username, password }
    users.push(newUser)
    saveRegisteredUsers(users)

    // Automatically sign in after signup
    authProvider.isAuthenticated = true
    authProvider.username = username
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', username)
  },

  async signout() {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
    authProvider.isAuthenticated = false
    authProvider.username = null // Set to null

    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
  },
}
