import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ModelView from "./ModelView";
import { useRef, useState , useEffect } from "react";
import { yellowImg } from "../utils";
import * as THREE from 'three';
import { View } from "@react-three/drei";
import { models } from "../constants";
import { sizes } from "../constants";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateWithGsapTimeline } from "../utils/Animations";

gsap.registerPlugin(ScrollTrigger);

const Model = () => {

  const [size , setSize] = useState('small');
  const [model , setModel] = useState({
      title: "iPhone 15 Pro in Natural Titanium",
      color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
      img: yellowImg,
  });

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group()); 
  //rotation of the model
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

    
  const tl = gsap.timeline();

  useEffect(() => {
      if(size === 'large'){
        animateWithGsapTimeline(tl,small,smallRotation,'#view1', '#view2', {
          transform: 'translatex(-100%)',
          duration: 2,
        });
        
      }

      if(size === 'small'){
        animateWithGsapTimeline(tl,large,largeRotation,'#view2', '#view1', {
          transform: 'translatex(0)',
          duration: 2,
        });
        
      }
  }, [size]);


  useGSAP(() => {
    gsap.to("#heading", {
      scrollTrigger: "#heading",
        opacity: 1,
        y: "0",
        duration: 1,
        ease: "power1.inOut",
    }, [])
  });

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />  

            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent',
                                                                  color: size === value ? 'black' : 'white',
                                                                  fontWeight: size === value ? 'bold' : 'normal'}}
                                                                   onClick={() => setSize(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Model
