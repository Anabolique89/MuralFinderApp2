import React from 'react';
import styles from '../style';
import { ArtZoroLogoWhite } from "../assets";
import { footerLinks } from '../constants';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const WebFooter = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className='flex-1 flex flex-col justify-start mr-10'>
        <a href="/">
          <img src={ArtZoroLogoWhite} alt="ArtZoro" className='w-[80px] h-[72px] object-contain' />
        </a>
        <p className={`${styles.paragraph} mt-4 max-w-[310px]`}>
          Explore new terrain and expand your creativity with ease.
        </p>
      </div>
      <div className='flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
        {footerLinks.map((footerLink) => (
          <div key={uuidv4()} className='flex flex-col ss:my-0 my-4 min-w-[150px]'>
            <h4 className='font-raleway font-bold text-[18px] leading-[27px] text-white'>
              {footerLink.title}
            </h4>
            <ul>
              {footerLink.links.map((link) => (
                <li key={uuidv4()} className={`font-raleway font-normal text-[16px] leading-[24px] 
                text-dimWhite hover:text-secondary cursor-pointer`}>
                  <a href={link.link} className="block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className='flex flex-column flex-start'>
      <p className="font-raleway font-normal text-dimWhite text-[14px] leading-[24.8px] mt-4">
        <span className="font-raleway font-bold text-orange-400 text-[18px] leading-[32.8px]">
          Disclaimer! <br />
        </span>
        All graffiti & street art spots in this legal wall directory are contributed by users.
        Information you find here may be incorrect or outdated.
        Always verify the legality of graffiti walls with local authorities before painting.
        We do not take responsibility for any illegal activities performed based on the information on this site.
        Also refer to our Terms & Conditions & Privacy Policy
      </p>
    </div>
  </section>
);

export default WebFooter;
