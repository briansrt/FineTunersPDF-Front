import './App.css'
import FileUpload from './components/FileUpload'

export default function Home() {

  return (
    <>
      <main className="home">
      <div className="container">
        <h1 className="title">Hackathon Lokahi Healthcare Accelerator</h1>
        <FileUpload/>
      </div>
    </main>
    </>
  )
}
