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
        Drag and drop a file here, or click to select
      </p>
      <p className="dropzone__subtext">
        (Only images and PDFs are allowed)
      </p>
    </div>
  )
}

