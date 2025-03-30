interface UserCredentials {
  username: string
  password: string // In a real app, NEVER store plain text passwords! Hash them.
}

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export interface AuthProvider {
  isAuthenticated: boolean
  username: null | string
  isAdmin: boolean // Added isAdmin flag
  signin(username: string, password: string): Promise<void>
  signup(username: string, password: string): Promise<void>
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
  isAdmin: localStorage.getItem('isAdmin') === 'true', // Initialize isAdmin from localStorage

  async signin(username: string, password: string) {
    await new Promise((r) => setTimeout(r, 500)) // fake delay

    let user: UserCredentials | undefined
    let isAdminUser = false

    // Check for hardcoded admin user first
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      user = { username, password }
      isAdminUser = true
    } else {
      // Check registered users
      const users = getRegisteredUsers()
      user = users.find(
        (u) => u.username === username && u.password === password, // Simple check
      )
    }

    if (!user) {
      throw new Error('Invalid username or password!')
    }

    authProvider.isAuthenticated = true
    authProvider.username = username
    authProvider.isAdmin = isAdminUser // Set isAdmin flag

    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', username)
    localStorage.setItem('isAdmin', isAdminUser.toString()) // Store isAdmin status
  },

  async signup(username: string, password: string) {
    await new Promise((r) => setTimeout(r, 500)) // fake delay

    // Prevent signing up with admin username
    if (username === ADMIN_USERNAME) {
      throw new Error(`Username "${ADMIN_USERNAME}" is reserved.`)
    }

    const users = getRegisteredUsers()

    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      throw new Error('Username already exists!')
    }

    // Add new user
    const newUser: UserCredentials = { username, password }
    users.push(newUser)
    saveRegisteredUsers(users)

    // Automatically sign in after signup (as a non-admin)
    authProvider.isAuthenticated = true
    authProvider.username = username
    authProvider.isAdmin = false // Regular users are not admins
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', username)
    localStorage.setItem('isAdmin', 'false') // Store isAdmin status
  },

  async signout() {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
    authProvider.isAuthenticated = false
    authProvider.username = null
    authProvider.isAdmin = false // Reset isAdmin on signout

    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    localStorage.removeItem('isAdmin') // Remove isAdmin status
  },
}
