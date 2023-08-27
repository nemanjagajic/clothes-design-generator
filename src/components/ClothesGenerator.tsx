import React, { useEffect, useState } from 'react'
import { generateImage } from '../api/imageGenerator'
import socketIOClient from 'socket.io-client'

const ClothesGenerator = () => {
  const [description, setDescription] = useState('')
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])

  useEffect(() => {
    const baseApiUrl = process.env.REACT_APP_BASE_API_URL|| ''
    const socket = socketIOClient(baseApiUrl)

    socket.on('generatedImages', (data) => {
      setGeneratedImages(data)
      setIsGeneratingImages(false)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGenerateImage = () => {
    setIsGeneratingImages(true)
    generateImage(description)
  }

  return (
    <div>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={16}
        cols={80}
      />
      <br />
      <button onClick={handleGenerateImage} disabled={isGeneratingImages}>Generate images</button>
      {isGeneratingImages && (
        <div>Your images are being generated and will appear here, this can take up to a minute...</div>
      )}
      {generatedImages && generatedImages.length > 0 && (
        <div>
          {generatedImages.map((imageUrl) => (
            <img key={imageUrl} src={imageUrl} height={200} width={200}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClothesGenerator