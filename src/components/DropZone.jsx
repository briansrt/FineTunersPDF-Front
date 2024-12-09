import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import './styles/DropZone.css'

export default function DropZone({ onFileChange }) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileChange(acceptedFiles[0])
    }
  }, [onFileChange])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'image/*': [], 'application/pdf': []},
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'dropzone--active' : ''}`}
    >
      <input {...getInputProps()} />
      <Upload className="dropzone__icon" size={32} />
      <p className="dropzone__text">
        Arrastra y suelta un archivo aquí, o haz clic para seleccionar
      </p>
      <p className="dropzone__subtext">
        (Solo se permiten imágenes y PDFs)
      </p>
    </div>
  )
}

