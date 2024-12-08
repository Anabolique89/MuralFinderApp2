import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MapForWall from './MapForWall';
import WallService from '../services/WallService';
import Card from '../components/Card';
import styles from '../style';

const DisplayWalls = () => {
    const [walls, setWalls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchWallsFromDatabase();
    }, []);

    const fetchWallsFromDatabase = async () => {
        try {
            const response = await WallService.getAllWalls();
            if (response.success) {
                console.log(response.data.data);
                setWalls(response.data.data);
            } else {
                console.error('Error fetching walls:', response.message || response.data);
            }
        } catch (error) {
            console.error('Error fetching walls here:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={`bg-indigo-600 w-full overflow-hidden`}>
               <h2 className={`${styles.heading2} ${styles.paddingX} ${styles.flexCenter}`}>Walls</h2>
            {isLoading ? (
                <div className='flex justify-center items-center h-screen'>
                    <FontAwesomeIcon icon={faSpinner} spin size='4x' />
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center'>
    {walls.map(wall => (
        <div key={wall.id} className='m-1'>
            <Link to={`/wall/${wall.id}`} className="block text-white font-raleway">
                <div key={wall.id} className='m-2'>
                    <MapForWall
                        lat={wall.latitude}
                        long={wall.longitude}
                        title={wall.location_text}
                        image={wall.image_path}
                        style={{ height: '400px', overflow: 'hidden' }}
                    />
                </div>
            </Link>
        </div>
    ))}
</div>
            )}
            <div className='flex justify-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                <a href="/Map">View Full Map</a> 
                </button>
            </div>
        </section>
    );
};

export default DisplayWalls;
