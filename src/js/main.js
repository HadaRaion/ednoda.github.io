import '../styles/style.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Accordion from './modules/Accordion';

gsap.registerPlugin(ScrollTrigger);

new Accordion('#faq', {
  initialActive: 0,
  maxActive: 1
});

