import { useState, useEffect } from 'react'
import './styles/ImagePreview.css'

export default function ImagePreview({ file }) {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  if (!preview) {
    return null
  }

  return (
    <div className="image-preview">
      <img src={preview} alt="Preview" className="image-preview__img" />
    </div>
  )
}

