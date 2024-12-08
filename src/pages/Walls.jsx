import React from 'react'
import styles, { layout } from '../style';
import { WallsHero, WallsIntro, Footer, BackToTopButton } from '../components';
import DisplayWalls from './DisplayWalls';


const Walls = () => (

<section>
  <div className={`bg-indigo-600 ${styles.flexStart}`}>
  <div className={`${styles.boxWidth}`}>
  <WallsIntro />
  </div>
</div>
<div className={`bg-indigo-600 ${styles.paddingX} ${styles.flexCenter}`}>
<div className={`${styles.boxWidth}`}>
    <WallsHero />
   
    <DisplayWalls />
    <BackToTopButton />
   
      <Footer />
    </div>
    </div>
  </section>
)

export default Walls