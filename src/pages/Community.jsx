import styles, { layout } from '../style';
import {CommunitySection2, HeroCommunity, CommunityBlogSection, BackToTopButton} from "../components";
import Footer from '../components/Footer';


const Community = () => (
<section>
<div className={`bg-indigo-600 ${styles.flexStart}`}>
<div className={`${styles.boxWidth}`}>
  <HeroCommunity />
  </div>
  </div>

  <div className={`bg-indigo-600 ${styles.paddingX} ${styles.flexCenter}`}>
  <div className={`${styles.boxWidth}`}>

   <CommunitySection2 />
   <CommunityBlogSection />
   <BackToTopButton />

</div>
</div>
    <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
                  <Footer />
                  </div>
    </section>
  )


export default Community