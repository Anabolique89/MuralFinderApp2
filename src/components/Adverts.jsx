import React from 'react';
import styles, { layout } from '../style';
import {jhgfd, prints, prints2, wallpaper2} from '../assets';
import { Link } from 'react-router-dom';

const Adverts = () => {
    const features = [
        { name: 'ArtSupplies', description: 'Find various art supplies from different stores and of different types.' },
        { name: 'Materials', description: 'Any materials that might help your creative process or might help you decorate your house if you are an Artlover.' },
        { name: 'Books', description: 'Reading material and colectibles, from finding out information about the history of art to collection albums and more.' },
        { name: 'WallMurals', description: 'Find out how to comission a mural and what you could potentially need before you hire an artist.' },
        { name: 'Wallpaper', description: 'Decorate your own walls with decorative wallpaper of various types.' },
        { name: 'PosterPrints', description: 'And of course, if you are looking for high quality prints have a look around.' },
      ]
        return (
          <div className=" bg-indigo-600 rounded-md backdrop-filter backdrop-blur-lg dark:bg-[#1f1f1f] dark:text-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-10 px-4 py-20 sm:px-6 sm:py-30 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
              <div>
                <h2 className={`${styles.heading2} sm:text-4xl tracking-tight`}>Shop Categories</h2>
                <p className={`${styles.paragraph} mt-4 `}>
                Our shop contains various products that may be usefull for artists from various collaborators and stores. We are just now opening our Shop section 
                so please check it out in care you are in need of some inspiration and guidance.  
                </p>
      
                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  {features.map((feature) => (
                    <div key={feature.name} className="border-t border-gray-200 pt-4">
                      <dt className="font-semibold font-raleway text-white">{feature.name}</dt>
                      <dd className="mt-2 text-sm font-raleway text-dimWhite">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                <img
                  alt="mural"
                  src={jhgfd}
                  className="rounded-lg bg-gray-100"
                />
                <img
                  alt="materials"
                  src={prints}
                  className="rounded-lg bg-gray-100"
                />
                <img
                  alt="Wallpaper"
                  src={wallpaper2}
                  className="rounded-lg bg-gray-100"
                />
                <img
                  alt=""
                  src={prints2}
                  className="rounded-lg bg-gray-100"
                />
              </div>
              <div className={`${styles.flexCenter} mt-0`}>
        <Link to={'/Shop'} className={`flex py-2 px-4 mr-4 xs:py-1 xs:px-2 bg-blue-gradient font-raleway font-bold text-[16px] text-primary outline-none uppercase rounded-full ${styles}`}>SHOP NOW</Link>
    </div>
            </div>
      
          </div>
        )
      }


export default Adverts