import axios from 'axios'

interface ImageGenerationResponse {
  message: string;
  imageId: string;
}
export const generateImage = async (
  description: string,
  ref: string,
  onError: () => void,
): Promise<ImageGenerationResponse | null> => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL
  try {
    const response = await axios.post(`${baseUrl}/generateImage`, {
      description,
      ref,
    }) as any

    if (response.error!) {
      onError()
    }
    return response.data
  } catch (e) {
    onError()
    return null
  }
}
