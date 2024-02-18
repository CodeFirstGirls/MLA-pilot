import axios from 'axios'

export const loginRequest = async (data) => {
  'use server'
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: data.username,
      password: data.password,
    })

    if (response.status === 200) {
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: "Looks like there's an issue on our end. Please try again.",
    }
  }
}

export const signupRequest = async (data) => {
  'use server'
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signup', {
      username: data.username,
      password: data.password,
    })

    if (response.status === 200) {
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: "Looks like there's an issue on our end. Please try again.",
    }
  }
}
