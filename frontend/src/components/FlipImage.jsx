import axios from "axios";
import { useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import SideNav from "./SideNav";
import {BiRefresh, BiSolidDownload} from "react-icons/bi";
import { showError } from './../utils/ToastOptions';  
import { flipImageRoute } from "../utils/APIRoutes";



function FlipImage() {
    
  const fileInputField = useRef(null);

  const [inputImage, setInputImage] = useState(null);
  const [inputImageUrl, setInputImageUrl] = useState(null);
  const [outputImageUrl, setOutputImageUrl] = useState(null);
  
  
  const refreshState = () => {
    setInputImageUrl(null);
    setOutputImageUrl(null);
    fileInputField.current.value = '';
  };
  const handleFileSelect = () => {
    fileInputField.current.click();
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setInputImage(file);
      const imageUrl = URL.createObjectURL(file);
      setInputImageUrl(imageUrl);
    }
  };
  const handleSubmit = async () => {
    if(inputImage == null){
        showError('Select an Image');
        return;
    }
    console.log(inputImage);
    const formData = new FormData();
    console.log(formData);
    formData.append('file', inputImage);
    formData.append('title', inputImage.name);
    console.log(formData);
    try{
        const response = await axios.post(flipImageRoute, formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        });
        console.log(response.data);
        setOutputImageUrl(response.data);
      }
      catch (err) {
        if (err.response.status === 400) 
            showError('Invalid file format. Supported formats: JPG, JPEG, PNG');
        else
            showError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <SideNav path={0} />
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Flip Image</h1>
        <div className="md:flex flex-y">
          <div className="image-box md:mr-4 my-4">
            <div className="bg-gray-600 flex items-center justify-between">
              <p className="ml-3">Input Image</p>
              <BiRefresh className="mr-3 cursor-pointer" onClick={refreshState}/>
            </div>
            <div className="flex h-[100%] items-center justify-center">
              {
                inputImageUrl == null 
                ? <Button variant="gradient" onClick={handleFileSelect} className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload Image
              </Button>
              : <img src={inputImageUrl} alt="not-again" />
              }
              <input 
                className="hidden" 
                ref={fileInputField} 
                onChange={handleFileUpload}
                type="file" 
                accept="image/*"
                id="inputfile" />
            </div>
          </div>
          <div className="image-box md:ml-4 my-4">
            <div className="bg-gray-600 flex items-center justify-between">
              <p className="ml-3">Output Image</p>
              <BiSolidDownload className="mr-3 cursor-pointer"/>
            </div>
            <div className="flex h-[100%] items-center justify-center">
              {
                outputImageUrl && <img src={outputImageUrl} alt="not-again" />
              }
            </div>
          </div>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
}

export default FlipImage;
