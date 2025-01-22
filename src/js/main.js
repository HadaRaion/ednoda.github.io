import '../styles/style.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Accordion from './modules/Accordion';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import luge from '@waaark/luge'
import { initHeroAnimation } from './modules/Hero';

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Hero 애니메이션 초기화
initHeroAnimation();

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector('#benefit1'),
  src: "/lottie/simplify.lottie",
});

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector('#benefit2'),
  src: "/lottie/timesave.lottie", 
});

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector('#benefit3'),
  src: "/lottie/track.lottie",
});
