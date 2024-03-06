import styles, { layout } from '../style';
import { libraWhite } from '../assets';
import { Business, CardDeal, Clients, CTA, Footer, Stats, AboutSection2, CardWithImageExample, HeroAbout } from "../components";

const About = () => {
  return (
  
<section>
    <div className="bg-indigo-700 w-full overflow-hidden">
     <div className={`bg-indigo-700 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                  <HeroAbout />
                </div>
              </div>
    </div>
   
<div className={`bg-indigo-700 ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
<CardWithImageExample />

                  </div>
                  </div>

              
                  <AboutSection2 />
                  <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
                  <Footer />
                  </div>
                </section>

  )
}

export default About

