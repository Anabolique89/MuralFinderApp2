import styles, { layout } from '../style';
import { libraWhite } from '../assets';
import { Footer, AboutSection2, CardWithImageExample, HeroAbout, BackToTopButton } from "../components";

const About = () => {
  return (

    <section>
      <div className="bg-indigo-600 w-full overflow-hidden">
        <div className={`bg-indigo-600 ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <HeroAbout />
          </div>
        </div>
      </div>

      <div className={`bg-indigo-600 ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <CardWithImageExample />
          <BackToTopButton />
        </div>
      </div>


      <AboutSection2 />
      <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
        <Footer />
      </div>
    </section>

  )
}

export default About

