import { snake } from '../assets';
import styles, { layout } from '../style';

const AboutSection2 = () => (
  <section id="why" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={snake} alt="billing" className='w-[90%] h-auto relative z-[5]' />
<div className='absolute z-[3] -left-10 top-4 w-[97%] h-[67%] rounded-full white__gradient opacity-[0.5]'/>
<div className='absolute z-[0] -left-10 bottom-2 w-[80%] h-[50%] rounded-full pink__gradient opacity-[0.5]'/>
</div>
    <div className={`${styles.paddingX} ${layout.sectionInfo} bg-indigo-600 w-full overflow-hidden`}>
      <h2 className={styles.heading2}>Why use the

 <br className='sm:block hidden' />MuralFinder App?</h2>
      <p className={`${styles.paragraph} max-w-[470px] `}>
      In today’s time, urban art is slowly but surely becoming an integral part of the public urban environment and urban artists in turn, 
      become a vital part of urban society. <br></br><br></br>By beautifying the surrounding environment we bring about a richer and more empathic existence while living in the concrete jungle that we call our homes.

In many cultures of the world today, the environment is very important and it defines us with time, all the while altering and influencing the way we feel and interact with each other and the world around us.
      </p>
    </div>

  </section>
)
 

export default AboutSection2