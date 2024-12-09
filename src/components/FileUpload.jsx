import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import DropZone from './DropZone'
import ImagePreview from './ImagePreview'
import './styles/FileUpload.css'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('document', file)

    try {
      const response = await fetch('http://localhost:4000/api/process-document', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // Simular progreso de carga
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i)
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        alert('Archivo subido con éxito!')
      } else {
        throw new Error('Error al subir el archivo')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al subir el archivo')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleRemove = () => {
    setFile(null)
  }

  return (
    <div className="file-upload">
      <h2 className="file-upload__title">Subir Archivo Post-Quirurjico</h2>
      <DropZone onFileChange={handleFileChange} />
      {file && (
        <div className="file-upload__preview">
          <ImagePreview file={file} />
          <div className="file-upload__file-info">
            <span className="file-upload__file-name">{file.name}</span>
            <button
              onClick={handleRemove}
              className="file-upload__remove-button"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`button file-upload__button ${(!file || isUploading) ? 'file-upload__button--disabled' : ''}`}
      >
        {isUploading ? (
          <div className="file-upload__progress">
            <Upload className="file-upload__progress-icon" size={20} />
            <span>{uploadProgress}%</span>
          </div>
        ) : (
          'Subir Archivo'
        )}
      </button>
    </div>
  )
}

