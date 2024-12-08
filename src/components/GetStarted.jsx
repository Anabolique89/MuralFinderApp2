import styles from '../style';
import { arrowUp } from '../assets';

const GetStarted = () => (
    <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
<div className={`${styles.flexCenter} flex-col bg-indigo-600 w-[100%] h-[100%] rounded-full hover:cta-block`}>
<div className={`${styles.flexStart} flex-row`}>

<p className='font-raleway font-bold text-[18px] leading-[23px] mr-2'>
<a href='/Map' className=''><span className='text-gradient'>Find</span></a>

  </p>
  <a href='/Map' className='' ><img src={arrowUp} alt="arrow" className="w-[23px] h-[23px] object-contain" /></a>
</div>

<p className='font-raleway font-bold text-[18px] leading-[23px]'>
<a href='/Map' className='' ><span className='text-gradient'>Walls</span></a>
</p>
</div>

    </div>
  )

export default GetStarted