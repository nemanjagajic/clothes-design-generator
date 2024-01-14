import axios from 'axios'

export const generateImage = async (
  description: string,
  ref: string,
  onError: () => void,
) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL
  try {
    await axios.post(`${baseUrl}/generateImage`, {
      description,
      ref,
    })
  } catch (e) {
    onError()
    console.log(e)
  }
}
