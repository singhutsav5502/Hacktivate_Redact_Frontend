import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import Sidebar from './Sidebar'; // Adjust the import path as needed
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewFilesComponent = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const auth = useSelector(state => state.auth)
  useEffect(()=>{
      if(!auth.token || !auth.username) {
          toast.error('User not logged in!')
          navigate('/login')
      }
  },[])

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/files`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        setError('Failed to fetch files: ' + error.message);
      }
    };

    fetchFiles();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Sidebar />
      <Typography variant="h4" sx={{ mb: 2 }}>View Redacted Files</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {files?.map((file) => (
          <ListItem key={file.filename}>
            <ListItemText primary={file.original_filename} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open(`${file.cloudinary_url}`)}
            >
              Download
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ViewFilesComponent;
