import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { heroVideo, smallHeroVideo } from '../utils/index.js';

const Hero = () => {
  // State to manage video source based on window width
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setVideoSrc(window.innerWidth < 768 ? smallHeroVideo : heroVideo);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP animation effect
  useEffect(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay:1,
      duration: 2,
      y: 0,
      ease: "power1.inOut",
    });
    gsap.to("#cta", {
      opacity: 1,
      duration: 2,
      y: '-50',
      ease: "power1.inOut",
      delay: 1.5,
    });
    gsap.to('.btn', { delay: 2.5, padding: '0.6rem 4rem', ease: "power1.inOut",} )
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
          <div className="md:w-10/12 w-9/12">
            <video className='pointer-events-none' autoPlay muted playsInline key={videoSrc}>
               <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
      </div>
      <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
      <a href="#highlights" className='btn'>buy</a>
      <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
      
    </section>
  );
};

export default Hero;
