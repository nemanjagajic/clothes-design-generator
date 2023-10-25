import axios from 'axios'

export const generateImage = async (description: string, ref: string) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL
  const response = await axios.post(`${baseUrl}/generateImage`, {
    description,
    ref
  })

  console.log({ response })
}