import styles from '../style';
import {google, Interlinked} from '../assets';
import GetStarted from './GetStarted';
import { Button } from '@headlessui/react';
import AuthService from '../services/AuthService'; 


const isLoggedIn = AuthService.isAuthenticated(); // Check if the user is authenticated

const Hero = () => (
 
   <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
    
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 `}>
      {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
<img src={discount} alt="discount" className="w-[32px] h-[32px]" />
<p className={`${styles.paragraph} ml-2`}>
<span className="text-white">20%</span> Discount For {""}
<span className="text-white">1 Month</span> Account 
</p>
      </div> */}
<div className="flex flex-row justify-between items-center w-full">
  <h1 className="flex-1 font-raleway font-bold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">Welcome To<br className="sm:block hidden" /> {" "}
    <span className="text-gradient font-blowBrush">ArtZoro App</span> <br/> {" "}
    MuralFinder.</h1>
    <div className='ss:flex hidden md:mr-4 mr-0'>
<GetStarted/>
    </div>
</div>

<p className={`${styles.paragraph} max-w-[470px] mt-5`}>A platform that connects the urban art community worldwide and allows artists to explore new terrain and expand their creative talents easily all 
  the while meeting new people and sharing new experiences with fellow artists.</p>
  <div className='flex flex-row justify-centre'>
  <img src={google} alt="googleplay" className='w-[100px] h-auto object-contain mr-5 cursor-pointer mt-2' />
  {!isLoggedIn && (
            <a href="/IndexSignup">
              <button type="button" className={`py-1 px-2 mt-2 bg-blue-gradient font-raleway font-bold text-[18px] text-primary outline-none uppercase rounded-full ${styles}`}>
                Signup
              </button>
            </a>
          )}
  </div>
    </div>
    <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
  <img src={Interlinked} alt="interlinked" className="w-[100%] h-auto relative z-[5] p-8 md:px-20 sm:px-26 ss:px-20"/>
  <div className="absolute z-[0] w-[40%] h-[35%] bottom-0 rounded-full pink__gradient"/>
  <div className="absolute z-[1] w-[80%] h-[80%]  rounded-full bottom-8 white__gradient"/>
  <div className="absolute z-[0] w-[50%] h-[50%]  bottom-6 blue__gradient"/>
</div>

<div className={`ss:hidden ${styles.flexCenter}`}>
<GetStarted/>
</div>
   </section>
  )

export default Hero