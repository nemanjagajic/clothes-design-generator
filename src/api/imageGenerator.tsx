import axios from 'axios'

export const generateImage = async (description: string, ref: string) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL
  try {
    await axios.post(`${baseUrl}/generateImage`, {
      description,
      ref
    })
  } catch (e) {
    console.log(e)
  }
}