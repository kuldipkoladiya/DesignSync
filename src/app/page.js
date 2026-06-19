"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Instagram,
  Send, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  Compass, 
  Users, 
  TrendingUp, 
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Star,
  Check,
  PenTool,
  Megaphone,
  RefreshCw,
  Lightbulb,
  Search,
  Rocket,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Dribbble
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  
  const [showLoader, setShowLoader] = useState(true);
  
  // Custom Cursor Refs
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  // Animation Refs
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const processRef = useRef(null);
  const showcaseRef = useRef(null);
  const ctaBannerRef = useRef(null);
  const contactRef = useRef(null);

  // Advanced Animation Refs
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const keywordRef = useRef(null);
  const preloaderBg1Ref = useRef(null);
  const preloaderBg2Ref = useRef(null);
  const portfolioTrackRef = useRef(null);
  const processPathRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "social-media",
    message: ""
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappText = `Hello! My name is ${encodeURIComponent(formData.name)}. I am interested in your ${encodeURIComponent(formData.service)} services. Here are some details: ${encodeURIComponent(formData.message)}. Let's work together!`;
    window.open(`https://wa.me/919638470305?text=${whatsappText}`, "_blank");
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent("Hello Kuldip! I saw your portfolio and would love to discuss a project with you.");
    window.open(`https://wa.me/919638470305?text=${text}`, "_blank");
  };

  // Portfolio items from the reference image
  const portfolioItems = [
    {
      id: 1,
      title: "Qubie Branding",
      category: "branding",
      image: "/business_card_design.png",
      tag: "Brand Identity"
    },
    {
      id: 2,
      title: "Glow Skincare",
      category: "social media",
      image: "/post_design.png",
      tag: "Social Media Design"
    },
    {
      id: 3,
      title: "TravelVista",
      category: "social media",
      image: "/thumbnail_design.png",
      tag: "Social Media Campaign"
    },
    {
      id: 4,
      title: "Coffee Hill",
      category: "print design",
      image: "/business_card_design.png",
      tag: "Packaging Design"
    },
    {
      id: 5,
      title: "FitZone Gym",
      category: "social media",
      image: "/post_design.png",
      tag: "Social Media Design"
    },
    {
      id: 6,
      title: "TechFlow",
      category: "web design",
      image: "/thumbnail_design.png",
      tag: "Web Design"
    },
    {
      id: 7,
      title: "Burger House",
      category: "social media",
      image: "/post_design.png",
      tag: "Social Media Design"
    },
    {
      id: 8,
      title: "Real Estate Co.",
      category: "branding",
      image: "/business_card_design.png",
      tag: "Brand Identity"
    }
  ];

  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);



  // Hook to confirm client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom cursor tracking and interactive triggers using GSAP quickSetter for high performance
  useEffect(() => {
    if (!mounted) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Set initial centering offsets via GSAP to prevent transform clash
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50, opacity: 0 });

    const setDotX = gsap.quickSetter(cursorDot, "x", "px");
    const setDotY = gsap.quickSetter(cursorDot, "y", "px");

    let hasMoved = false;

    // Pre-calculate window offsets or coordinates if needed
    const updateCursor = (e) => {
      if (!hasMoved) {
        gsap.set([cursor, cursorDot], { opacity: 1 });
        hasMoved = true;
      }
      
      // Smoothly animate outer cursor container
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto"
      });
      // Move inner cursor dot instantaneously
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    window.addEventListener("mousemove", updateCursor);

    // Dynamic hover status checks for premium cursor feedback
    const updateInteractiveElements = () => {
      // Buttons & Navigation links
      const buttons = document.querySelectorAll("a, button, select, input[type='submit'], .portfolio-filter-pill");
      // Cards and grid items
      const cards = document.querySelectorAll(".portfolio-card-item, .service-card, .process-step, .metric-card, .weaponry-card, .faq-item");
      // Text inputs
      const textInputs = document.querySelectorAll("input[type='text'], input[type='email'], textarea");

      // Custom hovering classes
      const onEnterButton = () => {
        cursor.classList.add("hovered-button");
        cursorDot.style.transform = "translate(-50%, -50%) scale(0)";
        cursorDot.style.opacity = "0";
      };
      const onLeaveButton = () => {
        cursor.classList.remove("hovered-button");
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
        cursorDot.style.opacity = "1";
      };

      const onEnterCard = (e) => {
        const isPortfolio = e.currentTarget.classList.contains("portfolio-card-item");
        if (isPortfolio) {
          cursor.classList.add("has-text");
          const cursorText = cursor.querySelector(".custom-cursor-text");
          if (cursorText) cursorText.innerText = "VIEW";
        } else {
          cursor.classList.add("hovered");
        }
      };
      const onLeaveCard = () => {
        cursor.classList.remove("has-text", "hovered");
      };

      const onEnterInput = () => {
        cursor.classList.add("hovered");
      };
      const onLeaveInput = () => {
        cursor.classList.remove("hovered");
      };

      buttons.forEach(el => {
        el.addEventListener("mouseenter", onEnterButton);
        el.addEventListener("mouseleave", onLeaveButton);
      });

      cards.forEach(el => {
        el.addEventListener("mouseenter", onEnterCard);
        el.addEventListener("mouseleave", onLeaveCard);
      });

      textInputs.forEach(el => {
        el.addEventListener("mouseenter", onEnterInput);
        el.addEventListener("mouseleave", onLeaveInput);
      });

      return () => {
        buttons.forEach(el => {
          el.removeEventListener("mouseenter", onEnterButton);
          el.removeEventListener("mouseleave", onLeaveButton);
        });
        cards.forEach(el => {
          el.removeEventListener("mouseenter", onEnterCard);
          el.removeEventListener("mouseleave", onLeaveCard);
        });
        textInputs.forEach(el => {
          el.removeEventListener("mouseenter", onEnterInput);
          el.removeEventListener("mouseleave", onLeaveInput);
        });
      };
    };

    const cleanupHover = updateInteractiveElements();

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      cleanupHover();
    };
  }, [mounted, activeFilter, showLoader, activeFaq]);



  // Preloader count-up timer
  useEffect(() => {
    if (!mounted) return;

    const counterObj = { value: 0 };
    const counterEl = counterRef.current;
    const keywordEl = keywordRef.current;

    const preloaderTl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            setShowLoader(false);
          }
        });

        // 1. Slide preloader elements out
        exitTl.to(".preloader-header, .preloader-center, .preloader-bottom", {
          y: -40,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.in"
        });

        // 2. Slide the main overlay up
        exitTl.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: "expo.inOut"
        }, "-=0.15");

        // 3. Stagger secondary trailing colored panel slides
        exitTl.to(preloaderBg1Ref.current, {
          yPercent: -100,
          duration: 1.0,
          ease: "expo.inOut"
        }, "-=0.88");

        exitTl.to(preloaderBg2Ref.current, {
          yPercent: -100,
          duration: 1.0,
          ease: "expo.inOut"
        }, "-=0.88");
      }
    });

    preloaderTl.to(counterObj, {
      value: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.floor(counterObj.value);
        if (counterEl) {
          counterEl.innerText = rounded.toString().padStart(2, "0");
        }
        if (keywordEl) {
          let kw = "DISCOVER";
          if (rounded > 25 && rounded <= 50) kw = "PLAN";
          else if (rounded > 50 && rounded <= 75) kw = "DESIGN";
          else if (rounded > 75) kw = "DELIVER";
          keywordEl.innerText = kw;
        }
      }
    });

    return () => {
      preloaderTl.kill();
    };
  }, [mounted]);

  // Trigger Hero animations after preloader exits
  useEffect(() => {
    if (!mounted || showLoader) return;

    const tl = gsap.timeline();

    tl.fromTo(".nav-animated", 
      { y: -35, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );

    tl.fromTo(".hero-animate",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(".hero-image-animate",
      { scale: 0.88, opacity: 0, rotate: -1.5 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.1, ease: "back.out(1.1)" },
      "-=0.55"
    );

    tl.fromTo(".brand-logo-item",
      { y: 18, opacity: 0 },
      { y: 0, opacity: 0.5, stagger: 0.06, duration: 0.45, ease: "power2.out" },
      "-=0.3"
    );

    // 1. Floating UI Badges
    gsap.fromTo(".badge-1", 
      { y: 10 },
      { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );
    
    gsap.fromTo(".badge-2", 
      { y: -10 },
      { y: 10, duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );
    
    // 2. Slow floating background glow orbs
    gsap.to(".orb-1", {
      x: "random(-35, 35)",
      y: "random(-35, 35)",
      duration: "random(6, 9)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".orb-2", {
      x: "random(-45, 45)",
      y: "random(-45, 45)",
      duration: "random(7, 10)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".orb-3", {
      x: "random(-30, 30)",
      y: "random(-30, 30)",
      duration: "random(5, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [mounted, showLoader]);

  // Initialize GSAP scroll triggers and magnetic hover events
  useEffect(() => {
    if (!mounted || showLoader) return;

    gsap.registerPlugin(ScrollTrigger);

    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshTriggers);
    window.addEventListener("resize", refreshTriggers);
    const timeoutId1 = setTimeout(refreshTriggers, 500);
    const timeoutId2 = setTimeout(refreshTriggers, 1500);



    // 2. Services Section Reveal
    gsap.fromTo(".services-header-anim",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".service-card-anim",
      { y: 30, opacity: 0, scale: 0.96 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.08,
        duration: 0.5, 
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        }
      }
    );

    // 3. Horizontal Scroll Showcase (Portfolio) for Desktop
    const track = portfolioTrackRef.current;
    if (track && window.innerWidth > 900) {
      const scrollWidth = track.scrollWidth;
      const containerWidth = window.innerWidth;
      
      // Reveal the headers nicely
      gsap.fromTo(".portfolio-header-anim",
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          scrollTrigger: {
            trigger: "#works",
            start: "top 80%"
          }
        }
      );

      // Only scroll horizontally if content exceeds container width
      if (scrollWidth > containerWidth) {
        const xTranslate = -(scrollWidth - containerWidth + 150);
        
        // Clear centering styles in case they were set previously
        gsap.set(track, { clearProps: "justifyContent,width,paddingRight,x" });

        // Create scroll-bound horizontal animation
        const scrollTween = gsap.fromTo(track,
          { x: 0 },
          {
            x: xTranslate,
            ease: "none",
            scrollTrigger: {
              trigger: "#works",
              pin: true,
              scrub: 1.2,
              start: "top top",
              end: () => `+=${scrollWidth - containerWidth + 300}`,
              invalidateOnRefresh: true
            }
          }
        );

        // Scroll-linked images parallax shift
        const imgs = track.querySelectorAll(".portfolio-card-img");
        imgs.forEach(img => {
          gsap.fromTo(img,
            { xPercent: -15 },
            {
              xPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".portfolio-card-item"),
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true
              }
            }
          );
        });
      } else {
        // Center the cards nicely if they fit on screen
        gsap.set(track, { 
          x: 0, 
          justifyContent: "center", 
          width: "100%", 
          paddingRight: "calc((100vw - 1200px) / 2 + 24px)" 
        });
        
        const imgs = track.querySelectorAll(".portfolio-card-img");
        imgs.forEach(img => {
          gsap.set(img, { xPercent: 0 });
        });
      }
    } else {
      // Fallback animations for mobile devices
      gsap.fromTo(".portfolio-header-anim",
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          scrollTrigger: {
            trigger: "#works",
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(".portfolio-card-item",
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.08,
          duration: 0.5, 
          scrollTrigger: {
            trigger: ".portfolio-horizontal-track",
            start: "top 80%",
          }
        }
      );
    }

    // 4. Process Section SVG Path and step drawing
    const path = processPathRef.current;
    if (path && window.innerWidth > 1024) {
      const length = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-grid-container",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1.0
        }
      });
    }

    gsap.fromTo(".process-header-anim",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        scrollTrigger: {
          trigger: "#process",
          start: "top 85%",
        }
      }
    );

    // 2b. Weaponry Section Reveal
    gsap.fromTo(".weaponry-header-anim",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        scrollTrigger: {
          trigger: "#weaponry",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".weaponry-card",
      { y: 25, opacity: 0, scale: 0.97 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.06,
        duration: 0.5, 
        scrollTrigger: {
          trigger: ".weaponry-grid",
          start: "top 80%",
        }
      }
    );

    // 5b. FAQ Section Reveal
    gsap.fromTo(".faq-header-anim",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        scrollTrigger: {
          trigger: "#faq",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".faq-item",
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.08,
        duration: 0.5, 
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 80%",
        }
      }
    );

    // 5. Showcase Section Reveal
    gsap.fromTo(".section-showcase",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        scrollTrigger: {
          trigger: "#showcase",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".metric-card",
      { y: 30, opacity: 0, scale: 0.96 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.1,
        duration: 0.5, 
        scrollTrigger: {
          trigger: ".metrics-grid",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".phone-frame-wrapper",
      { x: -50, opacity: 0, rotate: -5 },
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".phone-frame-wrapper",
          start: "top 80%",
        }
      }
    );

    // 7. CTA Banner Reveal
    gsap.fromTo(".cta-banner-anim",
      { scale: 0.95, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        scrollTrigger: {
          trigger: ".cta-banner-anim",
          start: "top 85%",
        }
      }
    );

    // 8. Contact Section Reveal
    gsap.fromTo(".contact-card-anim",
      { scale: 0.97, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        }
      }
    );

    // 9. Magnetic Hover Elements Binding
    const magneticElements = document.querySelectorAll(".magnetic");
    const handleMagneticMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleMagneticLeave = (e) => {
      const el = e.currentTarget;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto"
      });
    };

    magneticElements.forEach(el => {
      el.addEventListener("mousemove", handleMagneticMove);
      el.addEventListener("mouseleave", handleMagneticLeave);
    });

    // 10. Service Card Spotlight Mouse Move Effect
    const serviceCards = document.querySelectorAll(".service-card");
    const handleSpotlightMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    };
    
    serviceCards.forEach(card => {
      card.addEventListener("mousemove", handleSpotlightMove);
    });

    return () => {
      window.removeEventListener("load", refreshTriggers);
      window.removeEventListener("resize", refreshTriggers);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      magneticElements.forEach(el => {
        el.removeEventListener("mousemove", handleMagneticMove);
        el.removeEventListener("mouseleave", handleMagneticLeave);
      });
      serviceCards.forEach(card => {
        card.removeEventListener("mousemove", handleSpotlightMove);
      });
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mounted, showLoader, activeFilter]);

  // Card Mouse Move event listener to calculate 3D Tilt parameters dynamically
  const handleMouseMove3D = (e) => {
    const cardElement = e.currentTarget;
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xRot = ((y - rect.height / 2) / (rect.height / 2)) * -6; // Max 6 degrees tilt
    const yRot = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    
    cardElement.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg) translateY(-4px)`;
  };

  const handleMouseLeave3D = (e) => {
    const cardElement = e.currentTarget;
    if (!cardElement) return;
    cardElement.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  // Hero section mouse parallax effect
  const handleHeroMouseParallax = (e) => {
    if (window.innerWidth <= 900) return;
    const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    
    gsap.to(".hero-premium-frame", {
      x: x * 12,
      y: y * 12,
      rotationY: x * 6,
      rotationX: -y * 6,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 1000,
      overwrite: "auto"
    });
    
    gsap.to(".hero-greeting-tag", {
      x: x * -10,
      y: y * -10,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Preloader Screen Overlay */}
      {showLoader && (
        <>
          <div ref={preloaderRef} className="preloader-overlay">
            <div className="preloader-header">
              <div className="preloader-logo">
                <span className="logo-icon-part logo-part-1"></span>
                <span className="logo-icon-part logo-part-2"></span>
                <span className="preloader-logo-text">DesignSync</span>
              </div>
              <span className="preloader-status-text">constructing experience</span>
            </div>
            
            <div className="preloader-center">
              <div className="preloader-counter-wrapper">
                <span ref={counterRef} className="preloader-counter">00</span>
                <span className="preloader-percent">%</span>
              </div>
            </div>
            
            <div className="preloader-bottom">
              <div className="preloader-keyword-wrapper">
                <span ref={keywordRef} className="preloader-keyword">DISCOVER</span>
              </div>
              <span className="preloader-credits">Kuldip © {new Date().getFullYear()}</span>
            </div>
          </div>
          <div ref={preloaderBg1Ref} className="preloader-bg-slide"></div>
          <div ref={preloaderBg2Ref} className="preloader-bg-slide-2"></div>
        </>
      )}

      {/* Custom Cursor Followers */}
      <div 
        ref={cursorRef}
        className="custom-cursor"
      >
        <span className="custom-cursor-text"></span>
      </div>
      <div 
        ref={cursorDotRef}
        className="custom-cursor-dot"
      ></div>

      {/* Background Soft Glow Orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glow-orb orb-3"></div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ 
          backgroundImage: `radial-gradient(var(--text-muted) 1px, transparent 1px)`, 
          backgroundSize: '40px 40px',
          zIndex: -1
        }}
      ></div>

      {/* Floating Header */}
      <header className="nav-header nav-animated">
        <div className="container">
          <nav className="nav-bar">
            <a href="#" className="nav-logo">
              <div className="logo-icon-wrapper magnetic">
                <span className="logo-icon-part logo-part-1"></span>
                <span className="logo-icon-part logo-part-2"></span>
              </div>
              <div className="logo-text-group">
                <span className="logo-title-name">DesignSync</span>
                <span className="logo-subtitle-desc">Kuldip | Designer & Marketer</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="nav-links">
              <a href="#" className="nav-link active magnetic">Home</a>
              <a href="#services" className="nav-link magnetic">Services</a>
              <a href="#works" className="nav-link magnetic">Works</a>
              <a href="#showcase" className="nav-link magnetic">Showcase</a>
              <a href="#faq" className="nav-link magnetic">FAQ</a>
              <a href="#contact" className="nav-link magnetic">Contact</a>
            </div>

            <div className="nav-actions">
              <a 
                href="#contact"
                className="btn btn-talk magnetic"
              >
                Let&apos;s Talk
                <div className="btn-talk-arrow">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="nav-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer animate-fade-in">
            <a href="#" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#services" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#works" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Works</a>
            <a href="#showcase" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Showcase</a>
            <a href="#faq" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "12px" }}
            >
              Let&apos;s Talk
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section" onMouseMove={handleHeroMouseParallax}>
        <div className="container">
          <div className="hero-split-grid">
            
            {/* Left Content */}
            <div className="hero-left-content">
              <div className="hero-animate hero-greeting-tag">
                <span className="wave-icon">👋</span> Hello, I&apos;m Kuldip
              </div>

              <h1 className="hero-animate hero-main-heading">
                I Design. I Market. <br />
                I Help Brands <span className="text-gradient">Grow.</span>
              </h1>

              <p className="hero-animate hero-description-text">
                I&apos;m a Graphic Designer & Social Media Marketing expert helping businesses build stunning visuals and powerful online presence.
              </p>

              <div className="hero-animate hero-cta-buttons">
                <a href="#works" className="btn btn-primary magnetic">
                  View My Works
                  <ChevronRight className="w-4 h-4 btn-chevron-icon" />
                </a>
                <a href="#contact" className="btn btn-outline magnetic">
                  Hire Me
                  <Users className="w-4 h-4" />
                </a>
              </div>

              {/* Trusted Brand Logos */}
              <div className="hero-animate hero-trusted-brands">
                <span className="trusted-brands-label">Trusted by brands:</span>
                <div className="trusted-brands-logos">
                  <span className="brand-logo-item">airbnb</span>
                  <span className="brand-logo-item font-bold">Google</span>
                  <span className="brand-logo-item">HubSpot</span>
                  <span className="brand-logo-item font-semibold">Walmart</span>
                  <span className="brand-logo-item font-bold">Spotify</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="hero-image-animate hero-right-visual">
              <div className="hero-image-container">
                <div 
                  className="hero-premium-frame card-3d"
                  onMouseMove={handleMouseMove3D}
                  onMouseLeave={handleMouseLeave3D}
                >
                  <img 
                    src="/hero-image.png" 
                    alt="Kuldip Graphic Design & Marketing Portfolio" 
                  />
                </div>
                
                {/* Floating UI Badge Elements */}
                <div className="floating-badge badge-1">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span>Creative Artistry</span>
                </div>
                
                <div className="floating-badge badge-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Lead Conversion</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section id="services" ref={servicesRef} className="section-services">
        <div className="container">
          <div className="services-header-anim services-section-header">
            <span className="section-label">What I Do</span>
            <h2 className="section-title">
              Designs That Communicate. <br />
              Marketing That <span className="text-gradient">Converts.</span>
            </h2>
          </div>

          <div className="services-grid">
            {[
              {
                icon: <PenTool className="w-6 h-6 text-primary" />,
                title: "Graphic Design",
                desc: "Logo, Branding, Brochures, Packaging, and more eye-catching designs.",
                color: "purple"
              },
              {
                icon: <Megaphone className="w-6 h-6 text-secondary" />,
                title: "Social Media Marketing",
                desc: "Strategy, content creation, campaigns & analytics to grow your brand.",
                color: "pink"
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-cyan" />,
                title: "Content Creation",
                desc: "Engaging posts, stories, reels, and visuals that connect with audience.",
                color: "cyan"
              },
              {
                icon: <Lightbulb className="w-6 h-6 text-orange" />,
                title: "Brand Identity",
                desc: "Building memorable brand identities that stand out from the crowd.",
                color: "orange"
              }
            ].map((s, idx) => (
              <div 
                key={idx} 
                className={`service-card service-card-anim card-glow-${s.color}`}
              >
                <div className={`service-icon-wrapper service-icon-${s.color}`}>
                  {s.icon}
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Weaponry & Tech Stack Section */}
      <section id="weaponry" className="section-weaponry">
        <div className="container">
          <div className="weaponry-header-anim services-section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label">Weaponry & Marketing Stack</span>
            <h2 className="section-title">
              Elite Industry Tools <br />
              For High-Impact <span className="text-gradient">Deliverables.</span>
            </h2>
          </div>

          <div className="weaponry-grid">
            {[
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Figma",
                desc: "High-fidelity layouts, visual wireframes, and branding design systems."
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Adobe Photoshop",
                desc: "Premium raster manipulation, digital compositing, and visual artistry."
              },
              {
                icon: <PenTool className="w-6 h-6" />,
                title: "Adobe Illustrator",
                desc: "Infinite scalability vector cards, logos, packaging, and custom designs."
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Premiere & After Effects",
                desc: "Motion graphics, visual overlays, and highly engaging short-form videos."
              },
              {
                icon: <Megaphone className="w-6 h-6" />,
                title: "Meta Ads & Business Suite",
                desc: "Advanced social media marketing, target positioning, and reach analytics."
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Google Analytics & Tag Manager",
                desc: "Strategic conversion mapping, client lead monitoring, and data audit reports."
              },
              {
                icon: <Compass className="w-6 h-6" />,
                title: "Canva Pro Collaboration",
                desc: "Designing easy-to-use visual post templates for prompt client hands-on updates."
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "WhatsApp API Campaigning",
                desc: "Direct-to-client inquiry funnels and custom target lead response rigs."
              }
            ].map((tool, idx) => (
              <div 
                key={idx} 
                className="weaponry-card magnetic"
              >
                <div className="weaponry-icon-box">
                  {tool.icon}
                </div>
                <div className="weaponry-text-box">
                  <h4 className="weaponry-title">{tool.title}</h4>
                  <span className="weaponry-desc">{tool.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section id="works" ref={portfolioRef} className="section-works">
        <div className="portfolio-sticky-wrapper">
          <div className="container portfolio-header-container">
            <div className="portfolio-header-anim portfolio-header-flex">
              <div>
                <span className="section-label">Featured Works</span>
                <h2 className="section-title">Selected Projects</h2>
              </div>

              <div className="portfolio-header-actions">
                <div className="portfolio-filter-pill-bar">
                  {["all", "branding", "social media", "print design", "web design"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`portfolio-filter-pill magnetic ${activeFilter === filter ? "active" : ""}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <a href="#contact" className="btn btn-outline-small magnetic">
                  View All Works
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-horizontal-container">
            <div ref={portfolioTrackRef} className="portfolio-horizontal-track">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="portfolio-card-item card-3d"
                  onMouseMove={handleMouseMove3D}
                  onMouseLeave={handleMouseLeave3D}
                  style={{ transition: "transform 0.1s ease-out" }}
                >
                  <div className="portfolio-card-img-wrapper pop-out-3d">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="portfolio-card-img pop-out-image" 
                    />
                    <span className="portfolio-card-tag">
                      {item.tag}
                    </span>
                  </div>

                  <div className="portfolio-card-body pop-out-3d">
                    <h3 className="portfolio-card-title">{item.title}</h3>
                    <span className="portfolio-card-category">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* My 4-Step Process Section */}
      <section id="process" ref={processRef} className="section-process">
        <div className="container">
          <div className="process-header-anim process-section-header">
            <span className="section-label">My Process</span>
            <h2 className="section-title">My 4-Step Process</h2>
          </div>

          <div className="process-grid-container">
            <svg className="process-svg-line" viewBox="0 0 1100 100" fill="none" preserveAspectRatio="none">
              <path 
                ref={processPathRef}
                d="M 130,50 C 275,20 275,80 405,50 C 550,20 550,80 680,50 C 825,20 825,80 955,50" 
                stroke="url(#process-grad)" 
                strokeWidth="4" 
                strokeDasharray="10,10"
              />
              <defs>
                <linearGradient id="process-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="50%" stopColor="var(--secondary)" />
                  <stop offset="100%" stopColor="var(--accent-cyan)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="process-grid">
              {[
                {
                  step: "Step 01",
                  icon: <Search className="w-5 h-5 text-primary" />,
                  title: "Discover",
                  desc: "Understanding your goals, audience & competitors.",
                  color: "purple"
                },
                {
                  step: "Step 02",
                  icon: <Compass className="w-5 h-5 text-cyan" />,
                  title: "Plan",
                  desc: "Strategy, concept & creative direction.",
                  color: "cyan"
                },
                {
                  step: "Step 03",
                  icon: <PenTool className="w-5 h-5 text-blue" />,
                  title: "Design",
                  desc: "Bringing ideas to life with stunning visuals.",
                  color: "blue"
                },
                {
                  step: "Step 04",
                  icon: <Rocket className="w-5 h-5 text-pink" />,
                  title: "Deliver",
                  desc: "Final files & on-time delivery.",
                  color: "pink"
                }
              ].map((p, idx) => (
                <div 
                  key={idx} 
                  className="process-step process-step-anim"
                >
                  <div className="process-step-header">
                    <div className={`process-step-icon process-icon-${p.color}`}>
                      {p.icon}
                    </div>
                    <span className="process-step-num">{p.step}</span>
                  </div>
                  <h4 className="process-step-title">{p.title}</h4>
                  <p className="process-step-desc">{p.desc}</p>
                  {idx < 3 && <div className="process-step-connector"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curation Showroom / Instagram Mockup & Case Studies */}
      <section id="showcase" ref={showcaseRef} className="section-showcase">
        <div className="container">
          <div className="showcase-grid-layout">
            
            {/* Phone Simulator Frame Grid */}
            <div className="phone-frame-wrapper">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-header-profile">
                    <div className="phone-profile-pic">
                      <div className="phone-profile-inner">KD</div>
                    </div>
                    <div className="phone-profile-details">
                      <span className="phone-profile-name">kuldip.designs</span>
                      <span className="phone-profile-title">Graphics & Social Marketer</span>
                    </div>
                  </div>
                </div>
                
                <div className="insta-grid-mockup">
                  {[
                    { img: "/post_design.png", metric: "+240%", label: "Engagement" },
                    { img: "/business_card_design.png", metric: "50k", label: "Impressions" },
                    { img: "/thumbnail_design.png", metric: "11.5%", label: "CTR Rate" },
                    { img: "/instagram_grid.png", metric: "+180%", label: "Reach" },
                    { img: "/post_design.png", metric: "3.2k", label: "Saves" },
                    { img: "/business_card_design.png", metric: "10k+", label: "Leads" },
                    { img: "/thumbnail_design.png", metric: "+300%", label: "Views" },
                    { img: "/instagram_grid.png", metric: "15%", label: "Conversion" },
                    { img: "/post_design.png", metric: "12k", label: "Likes" }
                  ].map((post, idx) => (
                    <div key={idx} className="insta-grid-item">
                      <img src={post.img} alt={`Mockup Post ${idx + 1}`} className="insta-grid-img" />
                      <div className="insta-grid-overlay">
                        <span className="insta-stat-value">{post.metric}</span>
                        <span className="insta-stat-label">{post.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Strategy Case Studies & Performance Metrics */}
            <div className="showcase-metrics-panel">
              <div className="metrics-showcase-header">
                <span className="section-label">Case Studies & Performance</span>
                <h2 className="section-title">
                  Strategic Campaigns <br />
                  That Command <span className="text-gradient">Authority.</span>
                </h2>
              </div>
              
              <div className="metrics-grid">
                {[
                  {
                    tag: "Social Engagement Campaign",
                    title: "+180% Engagement Growth",
                    desc: "Re-architected Glow Skincare's visual hierarchy with high-contrast pastel cards, leading to viral interactions.",
                    val: "+180%",
                    lbl: "Engagement"
                  },
                  {
                    tag: "Video Thumbnail Optimization",
                    title: "11.5% Click-Through Rate",
                    desc: "Redesigned visual hooks and custom lettering on TechFlow's YouTube content, crushing the industry average of 4%.",
                    val: "11.5%",
                    lbl: "CTR"
                  },
                  {
                    tag: "Lead Generation Funnels",
                    title: "3x Direct Inquiries",
                    desc: "Crafted sleek carousel slides and direct booking overlays, multiplying inbound conversion queries.",
                    val: "3.0x",
                    lbl: "Leads"
                  }
                ].map((metric, idx) => (
                  <div key={idx} className="metric-card" onMouseMove={handleMouseMove3D} onMouseLeave={handleMouseLeave3D}>
                    <div className="metric-card-left">
                      <span className="metric-card-tag">{metric.tag}</span>
                      <h4 className="metric-card-title">{metric.title}</h4>
                      <p className="metric-card-desc">{metric.desc}</p>
                    </div>
                    <div className="metric-circle-wrapper">
                      <span className="metric-circle-val">{metric.val}</span>
                      <span className="metric-circle-label">{metric.lbl}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ & Blueprint Accordion Section */}
      <section id="faq" className="section-faq">
        <div className="container">
          <div className="faq-header-anim services-section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label">Common Inquiries</span>
            <h2 className="section-title">
              Tactical Collaboration <br />
              & Project <span className="text-gradient">Blueprints.</span>
            </h2>
          </div>

          <div className="faq-container">
            {[
              {
                q: "What design software and tools do you specialize in?",
                a: "I work primarily with the Adobe Creative Suite (Photoshop, Illustrator, Premiere Pro, After Effects) for visual artistry, vector branding, and video curation, and Figma for digital layouts and interactive designs."
              },
              {
                q: "How does the social media marketing collaboration work?",
                a: "We begin with a discovery strategy. I construct a content grid planner, design high-impact templates matching your brand guidelines, schedule targeted posts, and compile analytics reports showing growth rates and CTR conversions."
              },
              {
                q: "What is the typical turnaround time for branding packages?",
                a: "For complete brand identity development (logo design suites, typography parameters, custom card assets), it takes 1-2 weeks. Single items like social banners or thumbnails are typically delivered within 24-48 hours."
              },
              {
                q: "Can you handle high-retention video editing and YouTube styling?",
                a: "Yes, I edit reels, YouTube videos, and ads using visual hook editing techniques. I also design highly clickable thumbnails (+10% CTR average) and write matching caption content for conversion funnels."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? "active" : ""}`}
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="faq-trigger"
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.q}</span>
                  <div className="faq-icon-arrow">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div 
                  className="faq-content"
                  style={{ 
                    maxHeight: activeFaq === idx ? "200px" : "0px",
                    opacity: activeFaq === idx ? 1 : 0
                  }}
                >
                  <p className="faq-answer-text">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form / Contact Section */}
      <section id="contact" ref={contactRef} className="section-contact">
        <div className="container">
          <div className="contact-layout contact-card-anim">
            
            <div className="contact-info-panel">
              <div>
                <span className="section-label">Get In Touch</span>
                <h3 className="section-title" style={{ marginBottom: "16px" }}>Let&apos;s Build Something Iconic</h3>
                <p className="contact-info-desc">
                  Ready to scale your leads with elite designs? Fill in the details to construct an instant WhatsApp query, or choose the direct button.
                </p>
              </div>

              <div className="whatsapp-cta-box">
                <span className="whatsapp-cta-label">Instant Booking Shortcut</span>
                <button 
                  onClick={handleDirectWhatsApp}
                  className="btn btn-primary magnetic"
                  style={{ width: "100%" }}
                >
                  <Phone className="w-4 h-4 fill-white" />
                  Chat Directly on WhatsApp
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name" 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com" 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Service Needed</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="social-media">Social Media Posts Pack</option>
                  <option value="thumbnails">YouTube/Video Thumbnails</option>
                  <option value="branding">Business & Corporate Cards</option>
                  <option value="invitations">Luxury Invitations</option>
                  <option value="instagram-management">Complete Instagram Grid Curation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe your design needs..."
                  className="form-input"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary magnetic"
                style={{ width: "100%", padding: "16px 0" }}
              >
                <Send className="w-4 h-4" />
                Send Enquiry via WhatsApp
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* CTA Banner Bar */}
      <section ref={ctaBannerRef} className="section-cta-banner">
        <div className="container">
          <div className="cta-banner-anim cta-purple-banner">
            <div className="cta-banner-left">
              <div className="cta-paper-plane-icon">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div className="cta-banner-text-group">
                <h3 className="cta-banner-title">Ready to Grow Your Brand?</h3>
                <p className="cta-banner-desc">Let&apos;s work together and take your business to the next level.</p>
              </div>
            </div>
            <div className="cta-banner-right">
              <a href="#contact" className="btn btn-outline-white magnetic">
                Let&apos;s Talk
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top-grid">
            
            {/* Logo and Info */}
            <div className="footer-brand-col">
              <a href="#" className="footer-logo">
                <div className="logo-icon-wrapper">
                  <span className="logo-icon-part logo-part-1"></span>
                  <span className="logo-icon-part logo-part-2"></span>
                </div>
                <div className="logo-text-group">
                  <span className="logo-title-name">DesignSync</span>
                  <span className="logo-subtitle-desc">Kuldip | Designer & Marketer</span>
                </div>
              </a>
              <p className="footer-brand-desc">
                Helping brands communicate visually and grow digitally.
              </p>
              <div className="footer-social-links">
                <a href="#" className="social-icon-btn magnetic"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="social-icon-btn magnetic"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="social-icon-btn magnetic"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="social-icon-btn magnetic"><Dribbble className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <div className="footer-links-list">
                <a href="#">Home</a>
                <a href="#services">About</a>
                <a href="#works">Works</a>
                <a href="#services">Services</a>
                <a href="#showcase">Showcase</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            {/* Services Links */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">Services</h4>
              <div className="footer-links-list">
                <a href="#services">Graphic Design</a>
                <a href="#services">Social Media Marketing</a>
                <a href="#services">Content Creation</a>
                <a href="#services">Brand Identity</a>
                <a href="#services">Web Design</a>
              </div>
            </div>

            {/* Contact details */}
            <div className="footer-links-col">
              <h4 className="footer-col-title">Contact</h4>
              <div className="footer-contact-info">
                <div className="contact-info-item">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hello@designsync.com</span>
                </div>
                <div className="contact-info-item">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+1 (234) 567-8900</span>
                </div>
                <div className="contact-info-item">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>New York, USA</span>
                </div>
              </div>
            </div>

          </div>

          <div className="footer-bottom-row">
            <p className="footer-copy-text">
              &copy; {new Date().getFullYear()} DesignSync. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action WhatsApp Widget */}
      <a 
        href="https://wa.me/919638470305?text=Hello%20Kuldip!%20I%20would%20love%20to%20collaborate%20on%20a%20project%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-cta"
        aria-label="Chat on WhatsApp"
      >
        <div className="floating-cta-icon-wrapper">
          <Phone className="w-5 h-5 fill-white text-white" />
        </div>
        <span className="floating-cta-text">Start Project Chat</span>
      </a>

    </div>
  );
}
