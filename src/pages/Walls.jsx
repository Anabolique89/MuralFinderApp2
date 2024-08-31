import React from 'react'
import styles, { layout } from '../style';
import { WallsHero, WallsIntro, Footer, BackToTopButton } from '../components';
import DisplayWalls from './DisplayWalls';


const Walls = () => (

  <section className='bg-indigo-700 w-full overflow-hidden'>
     <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
    <WallsIntro />
    <WallsHero />
   
    <DisplayWalls />
    <BackToTopButton />
   
      <Footer />
    </div>
  </section>
)

export default Walls