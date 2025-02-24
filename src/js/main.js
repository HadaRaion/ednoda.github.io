import "../styles/style.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { createAnimatedText } from "./utils/textAnimation";
import Accordion from "./modules/Accordion";
import { initHeroAnimation } from "./modules/Hero";
import { initInstructionAnimation } from "./modules/Instruction";

function waitForResources() {
  return Promise.all([
    // check stylesheets
    ...Array.from(document.styleSheets).map(
      (stylesheet) =>
        new Promise((resolve) => {
          if (stylesheet.href) {
            const img = new Image();
            img.onerror = resolve;
            img.src = stylesheet.href;
          } else {
            resolve();
          }
        })
    ),
    // check images
    ...Array.from(document.images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
    ),
    // check fonts
    document.fonts.ready,
  ]);
}

// Initialize app
async function initializeApp() {
  try {
    // Check resources
    await waitForResources();

    // Initialize ScrollTrigger and Lenis
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initialize Accordion
    new Accordion("#faq", {
      initialActive: 0,
      maxActive: 1,
    });

    // 로딩 화면 제거
    const loader = document.getElementById("loader");
    document.body.classList.remove("loading");

    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        loader.remove();
      },
    });
  } catch (error) {
    console.error("Error initializing app:", error);
  }

  // Initialize animations
  initHeroAnimation();
  initInfiniteScrollText();
  initTextRevealAnimation();
  initLineRevealAnimation();
  initCardRevealAnimation();
  await initInstructionAnimation();
  initLottieAnimations();
}

// Scroll to top on page refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// DOM 로드 완료 시 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

function initLottieAnimations() {
  const lottieConfigs = [
    { id: "#benefit1", src: "/lottie/simplify.lottie" },
    { id: "#benefit2", src: "/lottie/timesave.lottie" },
    { id: "#benefit3", src: "/lottie/track.lottie" },
  ];

  lottieConfigs.forEach((config) => {
    new DotLottie({
      autoplay: true,
      loop: true,
      canvas: document.querySelector(config.id),
      src: config.src,
    });
  });
}

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

function initLineRevealAnimation() {
  const splitLines = createAnimatedText('[data-reveal="line-reveal"]', {
    type: "line",
  });

  splitLines.forEach(({ element, lines }) => {
    gsap.from(lines, {
      scrollTrigger: {
        trigger: element,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
      y: 20,
      autoAlpha: 0,
      ease: "power1.out",
      stagger: 0.15,
      delay: 0.3,
    });
  });
}

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
