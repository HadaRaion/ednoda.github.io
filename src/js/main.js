import "../styles/style.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { DotLottie } from "@lottiefiles/dotlottie-web";
// import luge from "@waaark/luge";
import { createAnimatedText } from "./utils/textAnimation";
import Accordion from "./modules/Accordion";
import { initHeroAnimation } from "./modules/Hero";
import { initInstructionAnimation } from "./modules/Instruction";

new Accordion("#faq", {
  initialActive: 0,
  maxActive: 1,
});

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero 애니메이션 초기화
initHeroAnimation();

// Instruction 애니메이션 초기화
initInstructionAnimation().catch(console.error);

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
  const splitTexts = createAnimatedText('[data-reveal="text-reveal"]', {
    type: "chars",
  });

  splitTexts.forEach(({ element, chars }) => {
    if (!chars) return;

    gsap.from(chars, {
      scrollTrigger: {
        trigger: element,
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

function initLineRevealAnimation() {
  const splitLines = createAnimatedText('[data-reveal="line-reveal"]', {
    type: "line",
  });

  console.log(splitLines);

  splitLines.forEach(({ element, lines }) => {
    gsap.from(lines, {
      scrollTrigger: {
        trigger: element,
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

initLineRevealAnimation();

function initInfiniteScrollText() {
  const scrollTexts = document.querySelectorAll(".marquee");

  scrollTexts.forEach((text) => {
    // ScrollTrigger 설정
    ScrollTrigger.create({
      trigger: text,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // progress 값을 CSS 변수로 설정 (0 ~ 1)
        text.style.setProperty("--progress", self.progress);
      },
    });
  });
}

// 기존 애니메이션 초기화 코드 뒤에 추가
initInfiniteScrollText();
