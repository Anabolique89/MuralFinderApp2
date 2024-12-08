import { faeWhite} from '../assets';
import styles, { layout } from '../style';

const CommunitySection2 = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={faeWhite} alt="billing" className='w-[90%] h-auto relative z-[5]' />
<div className='absolute z-[3] -left-10 top-4 w-[97%] h-[67%] rounded-full white__gradient opacity-[0.5]'/>
<div className='absolute z-[0] -left-10 bottom-2 w-[80%] h-[50%] rounded-full pink__gradient opacity-[0.5]'/>
</div>
    <div className={`${styles.paddingX} ${layout.sectionInfo} bg-indigo-600 w-full overflow-hidden`}>
      <h2 className={styles.heading2}>Find artists

 <br className='sm:block hidden' /> for hire</h2>
      <p className={`${styles.paragraph} max-w-[470px] `}>
      If you are looking for a specific type of artist you can browse our artistic gallery, where various artists sign up to showcase their work and gain a richer online presence.
      </p>
      <button type="button" className={`mt-4 py-2 px-4 bg-blue-gradient font-raleway font-bold text-[18px] text-primary outline-none uppercase rounded-full ${styles}`}>Browse Artists</button>
    </div>

  </section>
)
 

export default CommunitySection2