import "../styles/style.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Accordion from "./modules/Accordion";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import luge from "@waaark/luge";
import { initHeroAnimation } from "./modules/Hero";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero 애니메이션 초기화
initHeroAnimation();

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#benefit1"),
  src: "/lottie/simplify.lottie",
});

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#benefit2"),
  src: "/lottie/timesave.lottie",
});

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#benefit3"),
  src: "/lottie/track.lottie",
});

function initCardRevealAnimation() {
  const cards = document.querySelectorAll('[data-reveal="card-reveal"]');

  cards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
      duration: 1,
      y: 80,
      autoAlpha: 0,
      scale: 0.8,
      ease: "power2.out",
    });
  });
}

initCardRevealAnimation();

function initTextRevealAnimation() {
  const texts = document.querySelectorAll('[data-reveal="text-reveal"]');

  texts.forEach((text) => {
    const textsSplit = new SplitType(text, { types: "chars" });

    gsap.from(textsSplit.chars, {
      scrollTrigger: {
        trigger: text,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
      y: 20,
      autoAlpha: 0,
      ease: "power3.out",
      stagger: 0.06,
    });
  });
}

initTextRevealAnimation();
