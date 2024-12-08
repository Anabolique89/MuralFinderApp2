import styles from '../style';
import Button from './Button';
import {ShareSocial} from 'react-share-social';


const stylez = {
  root: {
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: 'white',

  },
  copyContainer: {
    border: '1px solid blue',
    background: 'rgb(0,0,0,0.7)',
    display: 'none'
  },
  title: {
    color: 'aquamarine',
    fontStyle: 'italic'
  }
};


const CTA = () => (

  
   <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col cta-block rounded-[20px] box-shadow `}>

    <div className='flex-1 flex flex-col'>
      <h2 className={styles.heading2}>Tell people about our app!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Invite your friends over to signup and join the fun and contribute to our worldwide artistic community!</p>
    </div>
    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
    </div>
    <div className='mb-10 pb-5'>
    <ShareSocial url="https://www.muralfinder.net/" socialTypes={["whatsapp", "facebook", "email", "reddit"]} 
                   style={stylez}
                  />
    </div>
   </section>
  )


export default CTA