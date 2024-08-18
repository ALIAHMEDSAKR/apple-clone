import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { animateWithGsap } from "../utils/Animations"
import {explore1Img, exploreVideo , explore2Img} from "../utils/index"
import { useRef } from "react";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
function Features() {

  const videoRef = useRef(null);
  const videoDuration = exploreVideo.duration; 

    useGSAP(() => {

      gsap.to('#exploreVideo', {
        currentTime: videoDuration,
        scrollTrigger: {
          trigger: videoRef.current,
          toggleActions: 'play pause reverse restart',
          start: '-10% bottom',
          scrub: true ,         // Link the animation to the scroll position
        },
        onComplete: () => {
          gsap.to(videoRef.current, {
            currentTime: 0, // Reset the video time to the beginning
          });
        },
      });


      animateWithGsap('#features-title', {
        opacity: 1,
        y: '0',
        duration: 1,
        ease: 'power1.inOut'
          }
      )

      animateWithGsap('.g_grow', 
          {scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.inOut',},
          {scrub: 5.5},
   
      )

      animateWithGsap('.g_text',{
            y: '0',
            opacity: 1,
            duration: 0.5,
            ease: 'power1.inOut',
          }
      )
    }, [])
  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width ">
        <div className="mb-12 w-full">
          <h1 id="features-title" className="section-heading">Explore the full story.</h1>
        </div>
        <div className="flex flex-col justify-center items-center ovre-hidden">
            <div className="mt-32 mb-24 pl-24">
                <h2 className="text-5xl lg:text-7xl font-semibold">Iphone.</h2>
                  <br />
                <h2 className="text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
            </div>
            <div className="flex-col flex-center sm:px-10">
                <div className="relative h-[50vh] w-full flex items-center">
                    <video playsInline muted id="exploreVideo" preload="none"
                           className="w-full h-full object-cover object-center rounded-3xl" autoPlay
                           ref={videoRef}>
                        <source src={exploreVideo} type="video/mp4" />
                    </video>
                </div>
                <div className="flex flex-col w-full relative">
                    <div className="feature-video-container mt-4">
                        <div className="overflow-hidden flex-1 h-[50vh] rounded-3xl">
                            <img src={explore1Img} alt="titanium"
                                  className="feature-video g_grow" />
                        </div>
                        <div className="overflow-hidden flex-1 h-[50vh] rounded-3xl">
                            <img src={explore2Img} alt="titanium2"
                                  className="feature-video g_grow" />
                        </div>
                    </div>
                    <div className="feature-text-container">
                      <div className="flex-1 flex-center">
                        <p className="feature-text g_text">
                          iPhone 15 Pro is {' '}
                          <span className="text-white">
                            the first iPhone to feature an aerospace-grade titanium design
                          </span>,
                          using the same alloy that spacecrafts use for missions to Mars.
                        </p>
                      </div>

                      <div className="flex-1 flex-center">
                        <p className="feature-text g_text">
                          Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                          <span className="text-white">
                            lightest Pro models ever.
                          </span>
                          You'll notice the difference the moment you pick one up.
                        </p>
                      </div>
                    </div>
                 </div>
             </div>
         </div>
      </div>
    </section>
  )
}

export default Features
