import React from 'react';
import styles from '../style';
import { libraWhite, google } from '../assets';

const HeroAbout = () => (

    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
    
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 `}>
      
<div className="flex flex-row justify-between items-center w-full">
  <h1 className="flex-1 font-raleway font-bold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">What is<br className="sm:block hidden" /> {" "}
    <span className="text-gradient font-blowBrush">ArtZoro App</span> <br/> {" "}
     or MuralFinder?</h1>
    <div className='ss:flex hidden md:mr-4 mr-0'>
    </div>
</div>

<p className={`${styles.paragraph} max-w-[480px] mt-5 sm:max-w-[600px]`}>We support local and global artists and help them develop their online presence on a social media app dedicated to visual arts of all kinds. <br/>
We record street art history and its timeline, the artists and their stories. <br/>We offer the possibility to find artistic inspiration on your travels, legal spots to paint and walls on the map. Not forgetting art events of all kinds and also relevant shops.</p>

    </div>
    <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
  <img src={libraWhite} alt="libra" className="w-[100%] h-auto relative z-[5] p-0 md:px-8 sm:px-12 ss:px-20"/>
  <div className="absolute z-[0] w-[40%] h-[35%] bottom-0 rounded-full pink__gradient"/>
  <div className="absolute z-[1] w-[80%] h-[80%]  rounded-full bottom-8 white__gradient opacity-[0.5]"/>
  <div className="absolute z-[0] w-[50%] h-[50%]  bottom-6 blue__gradient"/>
</div>


   </section>

 
  )


export default HeroAbout