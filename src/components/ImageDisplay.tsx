import React from 'react'

interface ImageDisplayProps {
  imageUrl: string | null
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <div className="mt-4">
      {imageUrl && (
        <div className="text-center">
          <img src={imageUrl} alt="Generated" className="max-w-full mx-auto" />
          <a
            href={imageUrl}
            download="generated-image.png"
            className="text-blue-500 underline mt-2 block"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  )
}

export default ImageDisplay
