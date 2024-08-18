import { hightlightsSlides } from "../constants"
import gsap from "gsap";
import { useRef, useEffect, useState } from "react"
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  // refs to keep to track of the videos
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  
  // usestate to keep track of the video state
  const [video, setVideo] = useState({
    videoId: 0,
    startPlay: false,
    isPlaying: false,
    isEnd: false,
    isLastVideo: false
  });
  
  // usestate to keep track of the loaded date
  const [loadedDate, setLoadedDate] = useState([]);
  
  // destructure the video state
  const { videoId, startPlay, isPlaying, isEnd, isLastVideo } = video;

  // useGSAP to handle the video play state
  useGSAP(() => {
    gsap.to('.bar', {
       scrollTrigger: '.bar',
       start: 'bottom top',
       opacity: 1,
       duration: 1.1,
       y: 0,
       ease: "power2.inOut",
       stagger: 0.25
     
    })
    gsap.to('#slider', {
      transform: `translateX(${-videoId * 100}%)`,
      ease: "power1.inOut",
      duration: 1.8,
    });

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true
        }));
      }
    });
  }, [isEnd, videoId]);

  // useEffect to set the video play state
  useEffect(() => {
    if (loadedDate.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedDate]);

  const handleLoadedMetaData = (e, i) => setLoadedDate((prev) => ([...prev, e]));

  // useEffect to set the video state
  useEffect(() => {
    // Define anim in a higher scope within useEffect
    let anim;
    let currentProgress = 0;
    
    // Get the current span of the video
    const currentSpan = videoSpanRef.current;
    
    // If we have a span for the current video
    if (currentSpan[videoId]) {
      // Create the GSAP animation
      anim = gsap.to(currentSpan[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 768 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
            });

            gsap.to(currentSpan[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });
            gsap.to(currentSpan[videoId], {
              backgroundColor: '#AFAFAF',
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }
    }
    
    // Define updateTheProgressBar after anim is defined
    const updateTheProgressBar = () => {
      if (videoRef.current[videoId]) {
        const videoElement = videoRef.current[videoId];
        const duration = hightlightsSlides[videoId].videoDuration;
        if (duration) {
          const progress = videoElement.currentTime / duration;
          anim.progress(progress);
        }
      }
    };

    if (isPlaying)
           {
      gsap.ticker.add(updateTheProgressBar);
    } else {
      gsap.ticker.remove(updateTheProgressBar);
    }

  }, [videoId, startPlay, isPlaying]);

  const handleProsses = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({
          ...prev, isEnd: true, videoId: i + 1
        }));
        break;
      case "video-last":
        setVideo((prev) => ({
          ...prev, isLastVideo: true
        }));
        break;
      case "replay":
        setVideo((prev) => ({
          ...prev, isLastVideo: false, videoId: 0
        }));
        break;
      case "play":
      case "pause":
        setVideo((prev) => ({
          ...prev, isPlaying: !prev.isPlaying
        }));
        break;
      default:
        return video;
    }
  };

  // Define handleKeyPress function
  const handleKeyPress = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      setVideo((prev) => ({
        ...prev, isPlaying: !prev.isPlaying
      }));
    }
  };

  // Add the event listener for keypress events
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container"> 
              <div className="w-full h-full
                                 flex-center
                                     rounded-3xl
                                      overflow-hidden
                                             bg-black">
                <video
                  id="video"
                  preload="auto"
                  playsInline={true}
                  muted
                  ref={(elem) => (videoRef.current[i] = elem)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo, isPlaying: true
                    }))
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(e, i)}
                  onEnded={() => {
                    i !== 3 ? handleProsses("video-end", i) : handleProsses("video-last")
                  }}
                  className='pointer-events-none'
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium hiw-text">{text}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 rounded-full backdrop-blur bar opacity-0 translate-y-20">
          {videoRef.current.map((_, i) => (
            <span
            onClick={() => {
              // Pause and reset the currently playing video
              if (videoRef.current[videoId]) {
                videoRef.current[videoId].pause();
                videoRef.current[videoId].currentTime = videoRef.current[videoId].duration; // end the video duration to close the progress bar dot on last video
              }
            
              // Update the state with the new videoId
              setVideo((prev) => ({
                ...prev,
                videoId: i,
                isPlaying: true, // Set isPlaying to true to auto-play the new video
              }));
            
              // Play the newly selected video
              if (videoRef.current[i]) {
                videoRef.current[i].play();
              }
            }}
              key={i}
              ref={(elem) => (videoDivRef.current[i] = elem)}
              className="mx-2 w-3 h-3 rounded-full bg-gray-200 relative cursor-pointer hover:scale-110"
            >
              <span className="absolute h-full w-full rounded-full" ref={(elem) => (videoSpanRef.current[i] = elem)} />
            </span>
          ))}
        </div>

        <button className="control-btn bar opacity-0 translate-y-20">
          <img 
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo ? () => handleProsses("replay")
              : !isPlaying ? () => handleProsses("play")
              : () => handleProsses("pause")
            }
          />
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;
