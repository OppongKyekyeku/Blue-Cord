const siteNav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-menu a, .nav-cta");
const navDropdowns = document.querySelectorAll(".nav-dropdown");
const mobileNavQuery = window.matchMedia("(max-width: 860px)");
const pointerGlow = document.querySelector(".pointer-glow");
const pointerDot = document.querySelector(".pointer-dot");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const heroCarousel = document.querySelector(".hero-carousel");
const heroSlides = heroCarousel ? Array.from(heroCarousel.querySelectorAll("[data-hero-slide]")) : [];
const heroDots = heroCarousel ? Array.from(heroCarousel.querySelectorAll("[data-hero-dot]")) : [];
const heroPrev = heroCarousel?.querySelector("[data-hero-prev]");
const heroNext = heroCarousel?.querySelector("[data-hero-next]");
const aboutSection = document.querySelector(".about-section");
const aboutPageSection = document.querySelector(".about-page-section");
const serviceSection = document.querySelector(".services-section");
const whySection = document.querySelector(".why-section");
const serviceAreasSection = document.querySelector(".service-areas-section");
const insuranceSection = document.querySelector(".insurance-section");
const consultationSection = document.querySelector(".consultation-section");
const faqSection = document.querySelector(".faq-section");
const getInTouchSection = document.querySelector(".get-in-touch-section");
const statValues = document.querySelectorAll("[data-count]");
const jotformFrames = document.querySelectorAll("[data-jotform-iframe]");

const revealSite = () => {
  if (!document.body.classList.contains("is-loading")) {
    return;
  }

  window.setTimeout(() => {
    document.body.classList.add("is-loaded");
    document.body.classList.remove("is-loading");
  }, 900);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", revealSite, { once: true });
} else {
  revealSite();
}

const initializeJotformEmbeds = () => {
  if (!jotformFrames.length) {
    return;
  }

  const resizeFrames = () => {
    if (typeof window.jotformEmbedHandler !== "function") {
      return;
    }

    jotformFrames.forEach((frame) => {
      window.jotformEmbedHandler(`iframe[id='${frame.id}']`, "https://form.jotform.com/");
    });
  };

  if (typeof window.jotformEmbedHandler === "function") {
    resizeFrames();
    return;
  }

  const existingScript = document.querySelector("[data-jotform-embed-handler]");
  if (existingScript) {
    existingScript.addEventListener("load", resizeFrames, { once: true });
    return;
  }

  const embedScript = document.createElement("script");
  embedScript.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
  embedScript.defer = true;
  embedScript.dataset.jotformEmbedHandler = "true";
  embedScript.addEventListener("load", resizeFrames, { once: true });
  document.head.append(embedScript);
};

if (document.readyState === "complete") {
  initializeJotformEmbeds();
} else {
  window.addEventListener("load", initializeJotformEmbeds, { once: true });
}

if (siteNav && navToggle && navPanel) {
  const closeNavDropdowns = () => {
    navDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".nav-link-dropdown")?.setAttribute("aria-expanded", "false");
    });
  };

  const setMenuOpen = (isOpen) => {
    siteNav.classList.toggle("menu-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

    if (!isOpen) {
      closeNavDropdowns();
    }
  };

  const syncNavState = () => {
    if (!mobileNavQuery.matches) {
      setMenuOpen(false);
    }
  };

  navDropdowns.forEach((dropdown) => {
    const dropdownLink = dropdown.querySelector(".nav-link-dropdown");

    dropdownLink?.setAttribute("aria-expanded", "false");
    dropdownLink?.addEventListener("click", (event) => {
      if (!mobileNavQuery.matches) {
        return;
      }

      event.preventDefault();

      const isOpen = dropdown.classList.contains("is-open");
      closeNavDropdowns();
      dropdown.classList.toggle("is-open", !isOpen);
      dropdownLink.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  navToggle.addEventListener("click", () => {
    setMenuOpen(!siteNav.classList.contains("menu-open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavQuery.matches && link.classList.contains("nav-link-dropdown")) {
        return;
      }

      if (mobileNavQuery.matches) {
        setMenuOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("menu-open")) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });

  if (typeof mobileNavQuery.addEventListener === "function") {
    mobileNavQuery.addEventListener("change", syncNavState);
  } else {
    mobileNavQuery.addListener(syncNavState);
  }
}

if (pointerGlow && pointerDot && !mobileNavQuery.matches && !prefersReducedMotion.matches) {
  const interactiveElements = document.querySelectorAll("a, button");
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let glowX = targetX;
  let glowY = targetY;
  let dotX = targetX;
  let dotY = targetY;
  let glowScale = 1;
  let dotScale = 1;
  let isPointerVisible = false;
  let pointerFrameId = null;

  const renderPointer = () => {
    glowX += (targetX - glowX) * 0.14;
    glowY += (targetY - glowY) * 0.14;
    dotX += (targetX - dotX) * 0.28;
    dotY += (targetY - dotY) * 0.28;

    pointerGlow.style.transform = `translate3d(${glowX - 85}px, ${glowY - 85}px, 0) scale(${glowScale})`;
    pointerDot.style.transform = `translate3d(${dotX - 7}px, ${dotY - 7}px, 0) scale(${dotScale})`;

    if (isPointerVisible) {
      pointerFrameId = window.requestAnimationFrame(renderPointer);
    } else {
      pointerFrameId = null;
    }
  };

  const startPointerLoop = () => {
    if (!pointerFrameId) {
      pointerFrameId = window.requestAnimationFrame(renderPointer);
    }
  };

  const showPointer = () => {
    if (!isPointerVisible) {
      pointerGlow.style.opacity = "1";
      pointerDot.style.opacity = "1";
      isPointerVisible = true;
      startPointerLoop();
    }
  };

  const hidePointer = () => {
    pointerGlow.style.opacity = "0";
    pointerDot.style.opacity = "0";
    isPointerVisible = false;
  };

  window.addEventListener("mousemove", (event) => {
    if (mobileNavQuery.matches) {
      hidePointer();
      return;
    }

    targetX = event.clientX;
    targetY = event.clientY;
    showPointer();
  });

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      glowScale = 1.22;
      dotScale = 0.82;
    });

    element.addEventListener("mouseleave", () => {
      glowScale = 1;
      dotScale = 1;
    });
  });

  document.addEventListener("mouseleave", hidePointer);
  window.addEventListener("blur", hidePointer);

  if (typeof mobileNavQuery.addEventListener === "function") {
    mobileNavQuery.addEventListener("change", (event) => {
      if (event.matches) {
        hidePointer();
      }
    });
  }
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".contact-bar", {
    y: -24,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
  });

  gsap.from(".site-nav", {
    y: -24,
    opacity: 0,
    duration: 0.9,
    delay: 0.15,
    ease: "power3.out"
  });

  if (aboutSection && !prefersReducedMotion.matches) {
    gsap.from(".about-media", {
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 72%",
        once: true
      },
      x: -32,
      opacity: 0,
      duration: 1.18,
      ease: "power3.out"
    });

    gsap.from(".about-content", {
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 72%",
        once: true
      },
      x: 32,
      opacity: 0,
      duration: 1.18,
      delay: 0.12,
      ease: "power3.out"
    });
  }

  if (aboutPageSection && !prefersReducedMotion.matches) {
    const aboutPageHero = document.querySelector(".about-page-hero");
    const aboutPageIntroItems = document.querySelectorAll(
      ".about-page-eyebrow, .about-page-title, .about-page-summary"
    );
    const aboutPageProofCards = document.querySelectorAll(".about-page-proof-card");
    const aboutPageStoryItems = aboutPageSection.querySelectorAll(".about-page-story-copy, .about-page-story-gallery");
    const aboutPageBeliefItems = aboutPageSection.querySelectorAll(
      ".about-page-belief-media, .about-page-belief-card, .about-page-counter-card"
    );

    gsap.from(aboutPageIntroItems, {
      scrollTrigger: {
        trigger: aboutPageHero || aboutPageSection,
        start: "top 72%",
        once: true
      },
      y: 16,
      opacity: 0,
      duration: 0.92,
      stagger: 0.1,
      ease: "power3.out"
    });

    gsap.from(aboutPageStoryItems, {
      scrollTrigger: {
        trigger: aboutPageSection,
        start: "top 72%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 1.0,
      stagger: 0.16,
      ease: "power3.out"
    });

    gsap.from(aboutPageProofCards, {
      scrollTrigger: {
        trigger: ".about-page-proof-grid",
        start: "top 86%",
        once: true
      },
      y: 20,
      opacity: 0,
      duration: 0.95,
      stagger: 0.14,
      ease: "power2.out"
    });

    gsap.from(aboutPageBeliefItems, {
      scrollTrigger: {
        trigger: ".about-page-beliefs",
        start: "top 78%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 1.0,
      stagger: 0.16,
      ease: "power3.out"
    });
  }

  if (serviceSection && !prefersReducedMotion.matches) {
    const serviceHeaderItems = serviceSection.querySelectorAll(
      ".services-eyebrow, .services-title, .services-intro"
    );
    const serviceCards = serviceSection.querySelectorAll("[data-service-card]");

    gsap.from(serviceHeaderItems, {
      scrollTrigger: {
        trigger: serviceSection,
        start: "top 76%",
        once: true
      },
      y: 20,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      stagger: 0.16
    });

    gsap.from(serviceCards, {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 82%",
        once: true
      },
      y: 32,
      opacity: 0,
      duration: 1.12,
      ease: "power2.out",
      stagger: 0.2,
      onStart: () => {
        serviceCards.forEach((card) => card.classList.add("is-revealing"));
      },
      onComplete: () => {
        serviceCards.forEach((card) => card.classList.remove("is-revealing"));
        gsap.set(serviceCards, { clearProps: "transform,opacity" });
      }
    });

    gsap.from(".services-action", {
      scrollTrigger: {
        trigger: ".services-action",
        start: "top 88%",
        once: true
      },
      y: 16,
      opacity: 0,
      duration: 0.92,
      ease: "power3.out"
    });
  }

  if (whySection && !prefersReducedMotion.matches) {
    gsap.from(".why-content", {
      scrollTrigger: {
        trigger: whySection,
        start: "top 72%",
        once: true
      },
      x: -30,
      opacity: 0,
      duration: 1.18,
      ease: "power3.out"
    });

    gsap.from(".why-media", {
      scrollTrigger: {
        trigger: whySection,
        start: "top 72%",
        once: true
      },
      x: 30,
      opacity: 0,
      duration: 1.18,
      ease: "power3.out"
    });

    gsap.from(".why-item", {
      scrollTrigger: {
        trigger: ".why-list",
        start: "top 82%",
        once: true
      },
      y: 20,
      opacity: 0,
      duration: 1.0,
      stagger: 0.18,
      ease: "power2.out"
    });

    gsap.from(".why-stat-card", {
      scrollTrigger: {
        trigger: ".why-stats",
        start: "top 88%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 1.0,
      stagger: 0.16,
      ease: "power2.out"
    });
  }

  if (serviceAreasSection && !prefersReducedMotion.matches) {
    const serviceAreaIntro = serviceAreasSection.querySelectorAll(
      ".service-areas-eyebrow, .service-areas-title, .service-areas-intro, .service-areas-meta, .service-areas-button"
    );
    const serviceAreaCards = serviceAreasSection.querySelectorAll("[data-area-card]");

    gsap.from(serviceAreaIntro, {
      scrollTrigger: {
        trigger: serviceAreasSection,
        start: "top 76%",
        once: true
      },
      y: 20,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      stagger: 0.14
    });

    gsap.from("[data-service-area-visual]", {
      scrollTrigger: {
        trigger: serviceAreasSection,
        start: "top 72%",
        once: true
      },
      x: 30,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out"
    });

    gsap.from(serviceAreaCards, {
      scrollTrigger: {
        trigger: ".service-areas-grid",
        start: "top 86%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 0.95,
      stagger: 0.1,
      ease: "power2.out"
    });
  }

  if (insuranceSection && !prefersReducedMotion.matches) {
    const insuranceHeaderItems = insuranceSection.querySelectorAll(
      ".insurance-eyebrow, .insurance-title, .insurance-intro"
    );

    gsap.from(insuranceHeaderItems, {
      scrollTrigger: {
        trigger: insuranceSection,
        start: "top 78%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 0.95,
      ease: "power3.out",
      stagger: 0.14
    });

    gsap.from(".insurance-carousel", {
      scrollTrigger: {
        trigger: ".insurance-carousel",
        start: "top 88%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 0.95,
      ease: "power3.out"
    });
  }

  if (consultationSection && !prefersReducedMotion.matches) {
    const syncConsultationBg = (self) => {
      const y = -76 + self.progress * 152;
      consultationSection.style.setProperty("--consultation-bg-y", `${y}px`);
    };

    ScrollTrigger.create({
      trigger: consultationSection,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onRefresh: syncConsultationBg,
      onUpdate: syncConsultationBg
    });

    gsap.from(".consultation-copy, .consultation-call, .consultation-media", {
      scrollTrigger: {
        trigger: consultationSection,
        start: "top 76%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 0.9,
      stagger: 0.16,
      ease: "power3.out"
    });
  }

  if (faqSection && !prefersReducedMotion.matches) {
    gsap.from(".faq-media", {
      scrollTrigger: {
        trigger: faqSection,
        start: "top 74%",
        once: true
      },
      x: -30,
      opacity: 0,
      duration: 1.12,
      ease: "power3.out"
    });

    gsap.from(".faq-eyebrow, .faq-title, .faq-intro", {
      scrollTrigger: {
        trigger: faqSection,
        start: "top 76%",
        once: true
      },
      y: 18,
      opacity: 0,
      duration: 0.95,
      stagger: 0.14,
      ease: "power3.out"
    });

  }

  if (getInTouchSection && !prefersReducedMotion.matches) {
    gsap.from(".get-in-touch-content", {
      scrollTrigger: {
        trigger: getInTouchSection,
        start: "top 74%",
        once: true
      },
      x: -26,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    });

    gsap.from(".get-in-touch-panel", {
      scrollTrigger: {
        trigger: getInTouchSection,
        start: "top 74%",
        once: true
      },
      x: 26,
      opacity: 0,
      duration: 0.9,
      delay: 0.08,
      ease: "power3.out"
    });
  }
}

if (statValues.length > 0) {
  const animateStat = (stat) => {
    if (stat.dataset.counted === "true") {
      return;
    }

    stat.dataset.counted = "true";

    const target = Number(stat.dataset.count || 0);
    const suffix = stat.dataset.suffix || "";
    const isRatio = stat.dataset.format === "ratio";
    const duration = prefersReducedMotion.matches ? 0 : 2400;
    const startTime = performance.now();

    const setValue = (value) => {
      const current = Math.round(value);
      stat.textContent = isRatio ? `${current}:1` : `${current}${suffix}`;
    };

    if (duration === 0) {
      setValue(target);
      return;
    }

    const tick = (now) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      setValue(target * eased);

      if (elapsed < 1) {
        window.requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    window.requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );

    statValues.forEach((stat) => statObserver.observe(stat));
  } else {
    statValues.forEach(animateStat);
  }
}

if (heroCarousel && heroSlides.length > 0) {
  let activeSlideIndex = heroSlides.findIndex((slide) => slide.classList.contains("is-active"));
  let autoRotateId = null;

  if (activeSlideIndex < 0) {
    activeSlideIndex = 0;
  }

  const getHeroAnimatedItems = (slide) => slide.querySelectorAll(
    ".hero-kicker, .hero-title, .hero-summary, .hero-actions"
  );

  const canAnimateHeroSlide = () => window.gsap && !prefersReducedMotion.matches && !mobileNavQuery.matches;

  const prepareHeroSlide = (slide) => {
    if (!canAnimateHeroSlide()) {
      return;
    }

    gsap.set(getHeroAnimatedItems(slide), { y: 18, opacity: 0 });
  };

  const animateHeroSlide = (slide) => {
    if (!canAnimateHeroSlide()) {
      return;
    }

    const animatedItems = getHeroAnimatedItems(slide);

    gsap.fromTo(
      animatedItems,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: true
      }
    );
  };

  const setActiveSlide = (nextIndex, options = {}) => {
    const shouldAnimate = options.animate !== false;
    const normalizedIndex = (nextIndex + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, index) => {
      const isActive = index === normalizedIndex;

      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    heroDots.forEach((dot, index) => {
      const isActive = index === normalizedIndex;

      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

    activeSlideIndex = normalizedIndex;
    if (shouldAnimate) {
      animateHeroSlide(heroSlides[activeSlideIndex]);
    }
  };

  const stopAutoRotate = () => {
    if (autoRotateId) {
      window.clearInterval(autoRotateId);
      autoRotateId = null;
    }
  };

  const startAutoRotate = () => {
    stopAutoRotate();

    if (heroSlides.length < 2 || prefersReducedMotion.matches) {
      return;
    }

    autoRotateId = window.setInterval(() => {
      setActiveSlide(activeSlideIndex + 1);
    }, 6500);
  };

  heroPrev?.addEventListener("click", () => {
    setActiveSlide(activeSlideIndex - 1);
    startAutoRotate();
  });

  heroNext?.addEventListener("click", () => {
    setActiveSlide(activeSlideIndex + 1);
    startAutoRotate();
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index);
      startAutoRotate();
    });
  });

  heroCarousel.addEventListener("mouseenter", stopAutoRotate);
  heroCarousel.addEventListener("mouseleave", startAutoRotate);
  heroCarousel.addEventListener("focusin", stopAutoRotate);
  heroCarousel.addEventListener("focusout", () => {
    if (!heroCarousel.contains(document.activeElement)) {
      startAutoRotate();
    }
  });

  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", () => {
      if (prefersReducedMotion.matches) {
        stopAutoRotate();
      } else {
        startAutoRotate();
      }
    });
  }

  const playInitialHeroAnimation = () => {
    window.setTimeout(() => {
      animateHeroSlide(heroSlides[activeSlideIndex]);
    }, 180);
  };

  setActiveSlide(activeSlideIndex, { animate: false });
  prepareHeroSlide(heroSlides[activeSlideIndex]);

  if (document.readyState === "complete") {
    playInitialHeroAnimation();
  } else {
    window.addEventListener("load", playInitialHeroAnimation, { once: true });
  }

  startAutoRotate();
}
