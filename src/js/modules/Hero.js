import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initHeroAnimation() {
  const heroLogo = new SplitType("#hero h1", { types: "chars" });
  const brandDesc = new SplitType("#hero p", { types: "lines" });
  const logoChars = heroLogo.chars;
  const descLines = brandDesc.lines;

  gsap.set(logoChars, {
    y: -100,
    opacity: 0,
  });

  const heroTl = gsap.timeline();

  heroTl
    .to(logoChars, {
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
      descLines,
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
      "-=0.5"
    );
}
