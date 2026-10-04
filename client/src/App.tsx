import document from "./assets/documents.png"
import UploadButton from "./components/UploadButton"

function App() {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-100 text-center mt-12">
        <img src={document} alt="A picture of a file" className="w-20"/>
        <h1 className="font-bold text-2xl mb-2">Upload a file to get started</h1>
        <p >Upload a PDF and start asking questions. Our AI will study your file and answer based on its content.</p>
      </div>
      <UploadButton />
    </div>
  )
}

export default App
