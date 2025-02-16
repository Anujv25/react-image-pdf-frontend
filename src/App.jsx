import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [loading, setLoading] = useState(false)

  const handleFile=(e)=>{
    uploadFile(e.target.files)
  }
  const uploadFile = async (files) => {
    setLoading(true)
    const formData = new FormData();
    // Append the file to the FormData
    const keys=Object.keys(files)
    keys.forEach((key)=>{
      formData.append("images", files[key]);
    })
    
    try {
        const response = await axios.post("https://react-image-pdf-backend.vercel.app/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "blob", // Get binary response for PDF
        });

        // Create a download link for the PDF file
        if(response.status===200){
          setLoading(false)
          const url = window.URL.createObjectURL(response.data);
          const a = document.createElement("a");
          a.href = url;
          a.download = "converted.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        }
       
    } catch (error) {
        console.error("❌ Error uploading file:", error);
    }
};
if(loading){
  return (
    <>
     <h2>Converting .....</h2>
    </>
  )
}
  return (
    <>
     <h2>Image to PDF Converter</h2>
     <label htmlFor="image">Select image</label>
      <input accept="image/png, image/jpeg" type="file" multiple  id="image" onChange={handleFile} name="image"/>
    </>
  )
}

export default App
