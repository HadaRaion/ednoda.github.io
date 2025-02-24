import { gsap } from "gsap";
import { createAnimatedText } from "../utils/textAnimation";

export function initHeroAnimation() {
  const heroLogo = createAnimatedText("#hero h1", { type: "chars" });
  const brandDesc = createAnimatedText("#hero p", { type: "lines" });

  gsap.set(heroLogo.chars, {
    y: -100,
    opacity: 0,
  });

  const heroTl = gsap.timeline();

  heroTl
    .to(heroLogo.chars, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "bounce.out",
      stagger: {
        amount: 0.8,
        from: "random",
        each: 0.12,
      },
    })
    .from(
      "#hero h2",
      {
        duration: 1.2,
        y: 15,
        autoAlpha: 0,
        scaleY: 0.9,
        ease: "power2.out",
      },
      "1.4"
    )
    .from(
      brandDesc.lines,
      {
        duration: 1,
        y: 15,
        autoAlpha: 0,
        scaleY: 0.9,
        ease: "power1.out",
        stagger: 0.2,
      },
      "1.8"
    )
    .from(
      "#hero a.button",
      {
        duration: 1.5,
        y: 30,
        autoAlpha: 0,
        ease: "power2.out",
      },
      "2.5"
    )
    .from(
      "#hero",
      {
        duration: 1.5,
        height: "100dvh",
        ease: "power2.inOut",
      },
      "-=1"
    );
}
