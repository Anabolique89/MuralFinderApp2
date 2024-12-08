import {  DigitalTrauma } from '../assets';
import styles, { layout } from '../style';
import { Link} from 'react-router-dom';

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={DigitalTrauma} alt="billing" className='w-[70%] h-auto relative z-[5]' />
<div className='absolute z-[3] -left-10 top-4 w-[97%] h-[67%] rounded-full white__gradient opacity-[0.5]'/>
<div className='absolute z-[0] -left-10 bottom-2 w-[80%] h-[50%] rounded-full pink__gradient opacity-[0.5]'/>
</div>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>How To Publish New

 <br className='sm:block hidden' /> Walls On The Map</h2>
      <p className={`${styles.paragraph} max-w-[470px] `}>
      If you are an artist or a stakeholder and you want to share a new painted wall with the world for them to paint on or just explore in a certain location, we are here to make that happen.

Just make sure the wall is a legal one and artists are allowed to paint there freely without any trouble. How to make sure? <br></br><br></br>Check out our blogs for more info on how to tell the difference.

Otherwise, if it's a permanent artwork, set the wall as illegal and people will visit your spot to see your amazing work!
      </p>

      <div className={`${styles.flexCenter} mt-6`}>
        <Link to={'/addWall'} className={`flex py-2 px-4 mr-4 xs:py-1 xs:px-2 bg-blue-gradient font-raleway font-bold text-[16px] text-primary outline-none uppercase rounded-full ${styles}`}>+ ADD WALL</Link>
        <Link to={'/BlogPosts'} className={`flex py-2 px-4 xs:py-1 xs:px-2 bg-blue-gradient font-raleway font-bold text-[16px] text-primary outline-none uppercase rounded-full ${styles}`}>BLOG POSTS</Link>
    </div>
    </div>

  </section>
)
 

export default Billing