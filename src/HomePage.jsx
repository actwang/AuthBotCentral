import './App.css'
import React, { useState, useRef } from 'react';
import {  Button, IconButton } from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import {TextField} from '@mui/material';
import { ref, uploadBytes } from 'firebase/storage';
import {storage} from './firebase';

function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  // File upload func
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    uploadFile(file);
  };
  const uploadFile = (file) => {
    // Perform file upload logic here
    if (file) {
        console.log('Uploading file:', file);
        // Get a reference to the storage location where you want to upload the file
        const storageRef = ref(storage, file.name);

        // Upload the file to the specified storage location
        uploadBytes(storageRef, file)
        .then((snapshot) => {
            console.log('File uploaded successfully:', snapshot);
            // Handle any additional logic after successful upload

        })
        .catch((error) => {
            console.error('Error uploading file:', error);
        });
    }
  };

  // Text input box
  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };
  // Key press enter
  const handleEnter = (e) =>{
    if (e.key === 'Enter' && message!==''){
      handleSubmit();
    }
  };

  // Button Submit
  const handleSubmit = () => {
    // Handle text submission logic here
    if (message) {
      console.log('Submitted message:', message);
      // Clears message
      setMessage('');
      //Auto focus
      if (inputRef.current){
        inputRef.current.focus();
      }
    }
  };


  return (
    <>
      <div style={{position: 'absolute', bottom: 50, left: 150, width: '100%'}}>
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <IconButton component="span" style={{}}>
            <AttachFile />
          </IconButton>
        </label>
        <TextField id="promptInputField" ref={inputRef}
          value={message}
          onChange={handleTextChange} 
          label='Enter Prompt here' 
          style={{ width: '1000px', height: '4px' , marginRight: '10px'}} 
          onKeyDown={handleEnter}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} size='medium'
            sx={{height:56}}>
          Send
        </Button>
      </div>
    </>
  );
};

export default HomePage;
