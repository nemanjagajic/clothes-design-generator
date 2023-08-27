import axios from 'axios'

export const generateImage = async (description: string) => {
  const token = process.env.REACT_APP_THE_NEXT_LEG_TOKEN
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  const response = await axios.post('https://api.thenextleg.io', {
    cmd: "imagine",
    msg: description
  })

  console.log({ response })
}