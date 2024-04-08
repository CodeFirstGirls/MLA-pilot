'use client'

export const setCurrentUser = (username: string) => {
  console.log('setting current user', username)
  sessionStorage.setItem('currentUser', username)
}

export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('currentUser')
  }
}

export const clearCurrentUser = () => {
  sessionStorage.removeItem('currentUser')
}
