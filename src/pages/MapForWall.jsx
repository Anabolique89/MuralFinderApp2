import React, { useState } from 'react';
import Card from '../components/Card';
import { Map, Marker, InfoWindow, APIProvider } from '@vis.gl/react-google-maps';
import { FaCheckCircle } from 'react-icons/fa'; // Import green check icon

const MapForWall = ({ lat, long, title, image, mapWidth, mapHeight, isVerified }) => {
    const latitude = Number(lat);
    const longitude = Number(long);

    if (isNaN(latitude) || isNaN(longitude)) {
        console.error("Latitude and Longitude must be valid numbers.");
        return null;
    }

    const [selected, setSelected] = useState(null);

    const titleStyles = {
        width: '100%', // Ensures the title is full width
        textAlign: 'center', // Centers the title text
        fontSize: '2rem', // Large font size for visibility
        fontWeight: 'bold', // Bold font weight for the title
        marginBottom: '0.5rem', // Adds a small margin below the title
        display: 'flex',
        alignItems: 'center', // Align items center to align the checkmark
        justifyContent: 'center', // Center items horizontally
    };

    const mapStyles = {
        width: mapWidth || '100%',
        height: mapHeight || '200px',
        border: 'none',
        borderRadius: '0',
        overflow: 'hidden'
    };

    const imageStyles = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '0'
    };

    const cardStyles = {
        padding: '0', // Removes padding to utilize full width
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    };

    const defaultCenter = { lat: latitude, lng: longitude };
    const mapKey = import.meta.env.VITE_MAP_KEY;

    return (
        <Card>
            <div style={titleStyles}>
                <h2>{title}</h2>
                {/* Conditionally render the green check icon */}
                {isVerified && <FaCheckCircle size={24} color='white' style={{ marginLeft: '10px' }} />}
            </div>
            <div style={{ ...mapStyles }}>
                <APIProvider apiKey={mapKey}>
                    <Map
                        defaultCenter={defaultCenter}
                        defaultZoom={15}
                        gestureHandling="greedy"
                        disableDefaultUI={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Marker 
                            position={defaultCenter}
                            onClick={() => setSelected(defaultCenter)}
                        />
                        {selected && (
                            <InfoWindow
                                position={defaultCenter}
                                onCloseClick={() => setSelected(null)}
                            >
                                <div>{title}</div>
                            </InfoWindow>
                        )}
                    </Map>
                </APIProvider>
            </div>
            <img
                src={`https://api.muralfinder.net/${image}`}
                alt="Wall Image"
                style={imageStyles}
            />
        </Card>
    );
};

export default MapForWall;
