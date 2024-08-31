import React, { useState, useCallback } from 'react';
import { LoadScript, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/system';
import LegalCheckbox from './LegalCheckbox';
import WallService from '../services/WallService';
import Footer from '../components/Footer';
import styles from '../style';
import BackToTopButton from './BackToTopButton';


const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#4338ca',
  color: '#fff',
  width: '90%',
  height: '100%',
  borderRadius: '10px',
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: '#4338ca',
  color: '#fff',
  width: '80%',
  margin: 'auto',
  height: '100%',
}));

const MapContainer = styled('div')({
  height: '400px',
  position: 'relative',
  borderRadius: '10px',
  overflow: 'hidden',
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
  padding: theme.spacing(2),
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

const apiKey = "AIzaSyBEfyuMVyPbaYNEDUXgbEE_SCoNC1y6kaw";

const AddWall = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [isLegal, setIsLegal] = useState(false); // State for legal checkbox

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

      console.log(location)
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
      setPhoto(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('location_text', title);
    formData.append('description', description);
    formData.append('latitude', Number(location.lat));
    formData.append('longitude', Number(location.lng));
    formData.append('is_verified', isLegal === true ? 1 : 0);
    formData.append('image', photo);

    try {
      const response = WallService.addWall(formData);
      console.log('Wall added successfully');
    } catch (error) {
      console.error('Error adding wall:', error);
    }
  };

  const handlePhotoChange = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setPhoto(acceptedFiles[0]);
    }
  }, []);

  return (
    <>
      <Root elevation={3} className= {`${styles.paddingX} p-4 m-auto w-50 font-raleway mt-6`}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Wall
        </Typography>
        <Form
          onSubmit={handleSubmit}>
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
            onChange={handlePhotoChange}
          />
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <DropzoneText variant="body2">Drag & drop a photo here, or click to select a file</DropzoneText>
            {photo && <img src={photo} alt="Selected" style={{ maxHeight: '200px', marginTop: '10px' }} />}
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
          <LegalCheckbox isLegal={isLegal} setIsLegal={setIsLegal} />

          <ButtonStyled
            type="submit"
            variant="contained"
          >
            Submit
          </ButtonStyled>
        </Form>

      </Root>
< BackToTopButton />
      <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
                <Footer />
            </div>
    </>
  );
};

export default AddWall;
