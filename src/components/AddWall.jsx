import React, { useState, useCallback } from 'react';
import { LoadScript, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { Button, TextField, Typography, Paper, IconButton, CircularProgress, Snackbar } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/system';
import LegalCheckbox from './LegalCheckbox';
import WallService from '../services/WallService';
import Footer from '../components/Footer';
import styles from '../style';
import BackToTopButton from './BackToTopButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Styled components
const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#4338ca',
  color: '#fff',
  width: '80%',
  margin: 'auto',
  borderRadius: '10px',
  position: 'relative',
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  color: '#fff',
  width: '100%',
  height: '100%',
}));

const MapContainer = styled('div')({
  height: '400px',
  position: 'relative',
  borderRadius: '10px',
  overflow: 'hidden',
  marginTop: '20px',
});

const Input = styled(TextField)({
  '& .MuiInputBase-root': {
    color: '#fff',
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
  },
});

const IconButtonStyled = styled(IconButton)({
  color: '#fff',
});

const DropzoneContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed #fff',
  borderRadius: '8px',
  padding: theme.spacing(3),
  cursor: 'pointer',
  color: '#fff',
  height: '200px',
}));

const DropzoneText = styled(Typography)({
  color: '#fff',
});

const ButtonStyled = styled(Button)({
  backgroundColor: '#6200ea',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#3700b3',
  },
  marginTop: '20px',
});

const SearchBox = styled('input')({
  boxSizing: 'border-box',
  border: '1px solid transparent',
  width: '240px',
  height: '32px',
  padding: '0 12px',
  borderRadius: '10px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipsis',
  position: 'absolute',
  left: '50%',
  marginLeft: '-120px',
  marginTop: '50px',
  color: '#000',
  top: '10px',
  zIndex: '10',
});

const LoadingOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

const apiKey = import.meta.env.VITE_MAP_KEY;

const AddWall = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [isLegal, setLegal] = useState(false); // State for legal checkbox
  const [loading, setLoading] = useState(false); // State for loading
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  const navigate = useNavigate()

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setPhoto(acceptedFiles[0]); // Store the File object directly
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('location_text', title);
    formData.append('description', description);
    formData.append('latitude', Number(location.lat));
    formData.append('longitude', Number(location.lng));
    formData.append('is_verified', isLegal ? 1 : 0);
    if (photo) {
      formData.append('image', photo); // Append the File object directly
    }
  
    
    try {
      const response = await WallService.addWall(formData);
      console.log(response)
      const wallId = response.data.id; // Get the wall ID from the response
      setToastMessage('Wall added successfully');
      setToastType('success');
      setOpenToast(true);
      setTimeout(()=>{
        navigate(`/wall/${wallId}`); // redirect to the wall page
      }, 5000)
    } catch (error) {
      setToastMessage('Error adding wall');
      setToastType('error');
      setOpenToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = () => {
    setOpenToast(false);
  };

  return (
    <>
      <Root elevation={3} className={`${styles.paddingX} p-4 m-auto w-4/5 font-raleway mt-6`}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Wall
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Input
            label="How do they call this wall"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-photo"
            type="file"
            onChange={(e) => handlePhotoChange(e.target.files)}
          />
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <DropzoneText variant="body2">Drag & drop a photo here, or click to select a file</DropzoneText>
            {photo && <img src={URL.createObjectURL(photo)} alt="Selected" style={{ maxHeight: '200px', marginTop: '10px' }} />}
          </DropzoneContainer>
          <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
            <MapContainer>
              <Autocomplete
                onLoad={setAutocomplete}
                onPlaceChanged={handlePlaceChanged}
              >
                <SearchBox
                  type="text"
                  placeholder="Search location"
                />
              </Autocomplete>
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={mapCenter}
                zoom={12}
                onClick={handleMapClick}
                options={{
                  styles: [
                    {
                      featureType: 'road',
                      elementType: 'geometry',
                      stylers: [
                        { color: '#5D176B' },
                        { weight: 2 },
                      ],
                    },
                    {
                      featureType: 'road',
                      elementType: 'labels.text.fill',
                      stylers: [
                        { color: '#000000' },
                      ],
                    },
                    {
                      featureType: 'road',
                      elementType: 'labels.text.stroke',
                      stylers: [
                        { color: '#ffffff' },
                      ],
                    },
                    // Add more styles here as needed
                  ],
                }}
              >
                {location && (
                  <Marker
                    position={location}
                  />
                )}
              </GoogleMap>
            </MapContainer>
          </LoadScript>
          <LegalCheckbox checked={isLegal} onChange={() => setLegal(!isLegal)} />
          <ButtonStyled type="submit" variant="contained" fullWidth>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Wall'}
          </ButtonStyled>
        </Form>
      </Root>
      <BackToTopButton />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message={toastMessage}
        action={<IconButtonStyled size="small" aria-label="close" color="inherit" onClick={handleToastClose}>×</IconButtonStyled>}
        ContentProps={{ style: { backgroundColor: toastType === 'success' ? '#4caf50' : '#f44336' } }}
      />
    </>
  );
};

export default AddWall;
