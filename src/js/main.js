import '../styles/style.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Accordion from './modules/Accordion';
import { DotLottie } from '@lottiefiles/dotlottie-web';


gsap.registerPlugin(ScrollTrigger);

new Accordion('#faq', {
  initialActive: 0,
  maxActive: 1
});



const benefitLottie1 = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector('#benefit1'),
  src: "/lottie/simplify.lottie",
});

const benefitLottie2 = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector('#benefit2'),
  src: "/lottie/timesave.lottie", 
});

const benefitLottie3 = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector('#benefit3'),
  src: "/lottie/track.lottie",
});