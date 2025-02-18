import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottie } from "@lottiefiles/dotlottie-web";

gsap.registerPlugin(ScrollTrigger);

export async function initInstructionAnimation() {
  const instructionItems = document.querySelectorAll(".instruction__item");

  try {
    const lottieAnimations = [
      new DotLottie({
        autoplay: false,
        loop: true,
        canvas: document.querySelector("#step-1"),
        src: "/lottie/step-1.lottie",
      }),
      new DotLottie({
        autoplay: false,
        loop: true,
        canvas: document.querySelector("#step-2"),
        src: "/lottie/step-2.lottie",
      }),
      new DotLottie({
        autoplay: false,
        loop: true,
        canvas: document.querySelector("#step-3"),
        src: "/lottie/step-3.lottie",
      }),
    ];

    await Promise.all(
      lottieAnimations.map(
        (animation) =>
          new Promise((resolve) => {
            animation.load();
            resolve();
          })
      )
    );

    instructionItems.forEach((item, index) => {
      const instructionHeadline = item.querySelector(".instruction__headline");
      const instructionDesc = item.querySelector(".instruction__desc");
      const instructionMedia = item.querySelector(".instruction__media");

      const lottieAnimation = lottieAnimations[index];

      // 첫 번째 ScrollTrigger - 한 번만 실행되는 애니메이션
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "-50% center",
          end: "bottom center",
          toggleActions: "play none none none",
        },
      });

      tl.from(instructionHeadline, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
      })
        .from(
          instructionDesc,
          {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
          },
          "0.4"
        )
        .from(
          instructionMedia,
          {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
              lottieAnimation.play();
            },
          },
          "0.8"
        );

      ScrollTrigger.create({
        trigger: item,
        start: "-40% center",
        end: "100% center",
        toggleClass: {
          targets: item,
          className: "active",
        },
        toggleActions: "play reverse play reverse",
      });
    });
  } catch (error) {
    console.error("Error initializing Lottie animations:", error);
  }
}
