import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Map,
  Marker,
  InfoWindow,
  APIProvider,
  // AdvancedMarker
} from "@vis.gl/react-google-maps";
import {
  DirectionsRenderer,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import WallService from "../services/WallService";
import Footer from "../components/Footer";
import styles from "../style";
import { Link } from "react-router-dom";

import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import trees from "../../data/trees";

// Example default bonds for each location
const defaultBonds = [
  {
    locationId: 1,
    connections: ["Location 2", "Location 3"],
    additionalInfo: "This is the main hub.",
  },
  {
    locationId: 2,
    connections: ["Location 1"],
    additionalInfo: "Secondary location with a mural.",
  },
  {
    locationId: 3,
    connections: ["Location 1"],
    additionalInfo: "A scenic spot with a mural.",
  },
];

const mapOptions = {
  styles: [
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { color: "#4B1EEE" }, // Change road color
        { weight: 1 }, // Change road weight
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#000000" }, // Change road label text color
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        { color: "#ffffff" }, // Change road label text stroke color
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { color: "#27399E" }, // Change water color
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#ffffff" }, // Change water label text color
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        { color: "#EADAD2" }, // Change landscape color
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        { color: "#4660D4" }, // Change POI (points of interest) color
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#5C6E94" }, // Change POI label text color
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        { color: "#70B4C9" }, // Change transit color
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#000000" }, // Change transit label text color
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        { color: "#1C1258" }, // Change administrative area color
      ],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#737373" }, // Change administrative label text color
      ],
    },
  ],
};

// Default locations if none are provided
const locations = [
  { lat: 37.7749, lng: -122.4194, name: "Location 1" },
  { lat: 37.7859, lng: -122.4364, name: "Location 2" },
  { lat: 37.7969, lng: -122.4574, name: "Location 3" },
];
const defaultCenter = { lat: 37.7749, lng: -122.4194 };
const style = {
  width: "100%",
  height: "100vh",
  border: "2px solid #c2c",
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
};

const defaultProps = {
  center: defaultCenter,
  zoom: 9,
  style: style,
  gestureHandling: "cooperative",
  zoomControl: true,
  options: mapOptions,
  scrollwheel: true,
  streetViewControl: true,
};

const Maps = ({ locations, defaultCenter, center, style }) => {
  const navigate = useNavigate();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [walls, setWalls] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [mapCenter, setMapCenter] = useState(center || defaultCenter);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);
  const [cameraProps, setCameraProps] = useState({
    ...defaultProps,
    center: mapCenter,
  });
  const [isLoading, setIsLoading] = useState(false);

  // load environment vairables

  const apiKey = import.meta.env.VITE_MAP_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(currentLocation);
          setMapCenter(currentLocation);
          console.log(currentLocation);
          setCameraProps((prevProps) => ({
            ...prevProps,
            center: currentLocation,
          }));
        },
        (error) => console.error("Error getting user location:", error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const fetchWallsFromDatabase = async () => {
      try {
        const response = await WallService.getAllWalls();
        if (response.success) {
          console.log(response.data.data);
          setWalls(response.data.data);
        } else {
          console.error("Error fetching walls:", response.message);
        }
      } catch (error) {
        console.error("Error fetching walls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallsFromDatabase();
  }, []);

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
    setTitle(walls[index].location_text);
    setImage(`https://api.muralfinder.net/${walls[index].image_path}`);
    setId(walls[index].id);
  };

  // const handleDirections = async (destination) => {
  //   if (!userLocation) {
  //     alert("Please allow location access to get directions.");
  //     return;
  //   }
   
  //   // Ensure latitude and longitude are numbers
  //   const finalDestination = {
  //     lat: parseFloat(destination.latitude),
  //     lng: parseFloat(destination.longitude)
  //   };
  // console.log(finalDestination);
  //   const service = new google.maps.DirectionsService();

  //   service.route(
  //     {
  //       origin: userLocation,
  //       destination: finalDestination,  // Properly structured destination object
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       console.log(result);
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDirections(result);
  //       } else {
  //         // console.error(`Error fetching directions ${result}`);
  //         console.error(`Error fetching directions: ${status}`, result);
  //       }
  //     }
  //   );
  // };
  

  const handleDirections = (destination) => {
    if (!userLocation) {
      alert("Please allow location access to get directions.");
      return;
    }
  
    const destinationLatLng = `${destination.latitude},${destination.longitude}`;
    const userLatLng = `${userLocation.lat},${userLocation.lng}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatLng}&destination=${destinationLatLng}&travelmode=driving`;
  
    window.open(directionsUrl, "_blank");
  };
  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place && place.geometry) {
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        // you can pass here zoom level or other details depending on what you need
      };
      setCameraProps((p) => ({ ...p, center: newCenter, zoom: 11 }));
      setSearchMarker(newCenter); // Set the marker at the searched location
    }
  };

  const handleCameraChange = React.useCallback((ev) =>
    setCameraProps(ev.detail)
  );

  return (
    <section>
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <APIProvider apiKey={apiKey}>
          {/* for height we need to pass a concrete value header=48px and footer=405px*/}
          <div style={{ width: "100%", height: "100vh" }}>
          <Map {...cameraProps} onCameraChanged={(ev) => setCameraProps(ev.detail)}>
            {/* mapId={'bf51a910020fa25a'} */}
            
              <Autocomplete
                onLoad={setAutocomplete}
                onPlaceChanged={handlePlaceChanged}
                className=""
                
              >
                <input
                  type="text"
                  placeholder="Search location"
                  style={{
                    boxSizing: "border-box",
                    border: "2px solid white",
                    width: "250px",
                    height: "40px",
                    padding: "0 12px",
                    borderRadius: "20px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
                    fontSize: "16px",
                    outline: "none",
                    textOverflow: "ellipses",
                    position: "absolute",
                    left: "50%",
                    top: "50px",
                    zIndex: "10",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: " blur(30px)",
                    color: "#000",
                  }}
                />
              </Autocomplete>
              <button
                onClick={() => navigate("/addWall")}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "100px",
                  zIndex: "10",
                  backgroundColor: "#000",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  cursor: "pointer",
                  transform: "translateX(-50%)",
                  marginTop: "10px",
                  color: "#fff",
                }}
              >
                + ADD WALL
              </button>

              {walls.map((wall, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: Number(wall.latitude),
                    lng: Number(wall.longitude),
                  }}
                  onClick={() => handleMarkerClick(index)}
                />
              ))}

              {searchMarker && <Marker position={searchMarker} />}

              {selectedMarker !== null && (
                <InfoWindow
                  style={{
                    backgroundColor: "#3700b3",
                    backgroundSize: "cover",
                    borderRadius: "20px",
                    color: "#fff",
                    display: "flex",
                    width: "250px",
                    height: "auto",
                    zIndex: "100",
                  }}
                  position={{
                    lat: Number(walls[selectedMarker].latitude),
                    lng: Number(walls[selectedMarker].longitude),
                  }}
                  onCloseClick={() => {
                    setSelectedMarker(null);
                    setTitle("");
                    setImage("");
                    setId("");
                  }}
                >
                  <div className="flex justify-between flex-col px-2 py-2 rounded-[20px] md:mr-2 mr-0 my-2 overflow-hidden z-[25]">
                    <Link to={`/wall/${id}`}>     
                    <h2 className="font-raleway font-semibold xs:text-[18px] text-[16px] text-white w-full p-2">
                      {title}
                    </h2>
                    </Link>
                    <img
                      className="object-cover w-full h-40 mb-4 rounded-md"
                      src={image}
                      alt="Wall"
                    />
                    <p className="text-white mb-2">
                      {defaultBonds[selectedMarker]
                        ? defaultBonds[selectedMarker].additionalInfo
                        : ""}
                    </p>
                    <button
                      onClick={() => handleDirections(walls[selectedMarker])}
                      disabled={!userLocation}
                      style={{
                        fontFamily: "Raleway",
                        fontSize: "16px",
                        fontWeight: "500",
                        borderRadius: "20px",
                        color: "#fff",
                      }}
                    >
                      Get Directions
                    </button>
                  </div>
                </InfoWindow>
              )}

            {directions && (
              <>
                {console.log("Directions Data:", directions)}

                <DirectionsRenderer 
                key={`directions_${Date.now()}`}
                directions={directions} 
                />
              </>
            )}

            </Map>
          </div>
        </APIProvider>
      </LoadScript>
      <div
        className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}
      >
        <Footer />
      </div>
    </section>
  );
};

export default Maps;