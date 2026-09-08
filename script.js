"use strict";

/* =========================================================
   INDEPENDENCE DAY 2027
   FINAL JAVASCRIPT
========================================================= */

(function () {
  /* =====================================================
       LOADER
    ===================================================== */

  function hideLoader() {
    const loader = document.getElementById("loader");

    if (loader) {
      loader.classList.add("hidden");
    }
  }

  /* DOM ready होने पर loader hide */
  document.addEventListener("DOMContentLoaded", function () {
    hideLoader();

    /* थोड़ा smooth transition देने के लिए */
    setTimeout(hideLoader, 500);

    /* =================================================
           MOBILE MENU
        ================================================= */

    const menuToggle = document.getElementById("menuToggle");

    const navMenu = document.getElementById("navMenu");

    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navMenu) {
          navMenu.classList.remove("open");
        }

        if (menuToggle) {
          menuToggle.classList.remove("open");

          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    /* =================================================
       CLOSE MOBILE MENU ON OUTSIDE CLICK
    ================================================= */

    document.addEventListener("click", function (event) {
      if (!navMenu || !menuToggle) {
        return;
      }

      const clickedInsideMenu = navMenu.contains(event.target);

      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        navMenu.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    /* =================================================
       CLOSE MOBILE MENU ON RESIZE
    ================================================= */

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && navMenu && menuToggle) {
        navMenu.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    /* =================================================
           NAVBAR
        ================================================= */

    const navbar = document.getElementById("navbar");

    const backToTop = document.getElementById("backToTop");

    function handleScroll() {
      const scrollY = window.scrollY || 0;

      if (navbar) {
        navbar.classList.toggle("scrolled", scrollY > 40);
      }

      if (backToTop) {
        backToTop.classList.toggle("show", scrollY > 500);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    /* =================================================
           BACK TO TOP
        ================================================= */

    if (backToTop) {
      backToTop.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }

    /* =================================================
           COUNTDOWN
           15 AUGUST 2027
        ================================================= */

    const daysElement = document.getElementById("days");

    const hoursElement = document.getElementById("hours");

    const minutesElement = document.getElementById("minutes");

    const secondsElement = document.getElementById("seconds");

    const targetDate = new Date("2027-08-15T00:00:00+05:30");

    function pad(number) {
      return String(number).padStart(2, "0");
    }

    function updateCountdown() {
      const now = new Date();

      let difference = targetDate.getTime() - now.getTime();

      if (difference < 0) {
        difference = 0;
      }

      const totalSeconds = Math.floor(difference / 1000);

      const days = Math.floor(totalSeconds / 86400);

      const hours = Math.floor((totalSeconds % 86400) / 3600);

      const minutes = Math.floor((totalSeconds % 3600) / 60);

      const seconds = totalSeconds % 60;

      if (daysElement) {
        daysElement.textContent = pad(days);
      }

      if (hoursElement) {
        hoursElement.textContent = pad(hours);
      }

      if (minutesElement) {
        minutesElement.textContent = pad(minutes);
      }

      if (secondsElement) {
        secondsElement.textContent = pad(seconds);
      }
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

    /* =================================================
           PARTICLES
        ================================================= */

    const particles = document.getElementById("particles");

    if (particles) {
      const particleCount = window.innerWidth < 600 ? 25 : 45;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration = 5 + Math.random() * 8 + "s";

        particle.style.animationDelay = Math.random() * 8 + "s";

        particle.style.opacity = 0.3 + Math.random() * 0.7;

        particles.appendChild(particle);
      }
    }

    /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            const id = entry.target.id;

            navLinks.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id,
              );
            });
          });
        },
        {
          rootMargin: "-35% 0px -55% 0px",
        },
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    /* =================================================
           SCROLL REVEAL ANIMATION
        ================================================= */

    const revealElements = document.querySelectorAll(
      ".section-heading, .about-card, .stat, .timeline-item, .hero-card, .celebration-content, .message-box",
    );

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("revealed");

            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      revealElements.forEach(function (element) {
        element.classList.add("reveal");

        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach(function (element) {
        element.classList.add("revealed");
      });
    }

    /* =================================================
       HERO MOUSE PARALLAX
    ================================================= */

    const heroSection = document.querySelector(".hero");

    const heroGlowOne = document.querySelector(".hero-glow-one");

    const heroGlowTwo = document.querySelector(".hero-glow-two");

    const heroChakra = document.querySelector(".hero-chakra");

    if (heroSection && window.matchMedia("(pointer: fine)").matches) {
      heroSection.addEventListener("mousemove", function (event) {
        const rect = heroSection.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;

        const y = (event.clientY - rect.top) / rect.height - 0.5;

        if (heroGlowOne) {
          heroGlowOne.style.transform = `translate(${x * 18}px, ${y * 12}px)`;
        }

        if (heroGlowTwo) {
          heroGlowTwo.style.transform = `translate(${x * -14}px, ${y * -10}px)`;
        }

        if (heroChakra) {
          heroChakra.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
        }
      });

      heroSection.addEventListener("mouseleave", function () {
        if (heroGlowOne) {
          heroGlowOne.style.transform = "";
        }

        if (heroGlowTwo) {
          heroGlowTwo.style.transform = "";
        }

        if (heroChakra) {
          heroChakra.style.transform = "";
        }
      });
    }

    /* =================================================
           CELEBRATION POPUP
        ================================================= */

    const celebrateButton = document.getElementById("celebrateBtn");

    const celebrationOverlay = document.getElementById("celebrationOverlay");

    const closeCelebration = document.getElementById("closeCelebration");

    function openCelebration() {
      if (!celebrationOverlay) {
        return;
      }

      celebrationOverlay.classList.add("show");

      celebrationOverlay.setAttribute("aria-hidden", "false");

      document.body.classList.add("no-scroll");

      createFireworks();
    }

    function closeCelebrationPopup() {
      if (!celebrationOverlay) {
        return;
      }

      celebrationOverlay.classList.remove("show");

      celebrationOverlay.setAttribute("aria-hidden", "true");

      document.body.classList.remove("no-scroll");
    }

    if (celebrateButton) {
      celebrateButton.addEventListener("click", openCelebration);
    }

    if (closeCelebration) {
      closeCelebration.addEventListener("click", closeCelebrationPopup);
    }

    if (celebrationOverlay) {
      celebrationOverlay.addEventListener("click", function (event) {
        if (event.target === celebrationOverlay) {
          closeCelebrationPopup();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeCelebrationPopup();
      }
    });

    /* =================================================
           FIREWORKS
        ================================================= */

    function createFireworks() {
      if (!celebrationOverlay) return;

      const numberOfFireworks = 18;

      for (let i = 0; i < numberOfFireworks; i++) {
        setTimeout(() => {
          const firework = document.createElement("div");
          firework.className = "firework";

          firework.style.left = `${10 + Math.random() * 80}%`;
          firework.style.top = `${8 + Math.random() * 55}%`;

          celebrationOverlay.appendChild(firework);

          setTimeout(() => {
            firework.remove();
          }, 1400);
        }, i * 120);
      }
    }

    /* =================================================
           MESSAGE FORM
        ================================================= */

    const messageForm = document.getElementById("messageForm");

    const nameInput = document.getElementById("name");

    const messageInput = document.getElementById("userMessage");

    const characterCount = document.getElementById("characterCount");

    const messageSuccess = document.getElementById("messageSuccess");

    if (messageInput) {
      messageInput.addEventListener("input", function () {
        if (!characterCount) {
          return;
        }

        const length = messageInput.value.length;

        characterCount.textContent = length;

        characterCount.classList.remove(
          "counter-warning",
          "counter-danger",
          "counter-limit",
        );

        if (length >= 300) {
          characterCount.classList.add("counter-limit");
        } else if (length >= 270) {
          characterCount.classList.add("counter-danger");
        } else if (length >= 200) {
          characterCount.classList.add("counter-warning");
        }
      });
    }

    if (messageForm) {
      messageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput ? nameInput.value.trim() : "";

        const message = messageInput ? messageInput.value.trim() : "";

        if (!name || !message) {
          return;
        }

        const messageData = {
          name: name,

          message: message,

          date: new Date().toISOString(),
        };

        let oldMessages = [];

        try {
          oldMessages = JSON.parse(
            localStorage.getItem("independenceDayMessages") || "[]",
          );

          if (!Array.isArray(oldMessages)) {
            oldMessages = [];
          }
        } catch (error) {
          oldMessages = [];
        }

        oldMessages.push(messageData);

        try {
          localStorage.setItem(
            "independenceDayMessages",
            JSON.stringify(oldMessages),
          );
        } catch (error) {
          console.warn("Could not save message.", error);
        }

        if (messageSuccess) {
          messageSuccess.textContent =
            "🇮🇳 Thank you, " +
            name +
            "! Your message for India has been saved.";

          messageSuccess.classList.add("show");
        }

        messageForm.reset();

        if (characterCount) {
          characterCount.textContent = "0";
        }
      });
    }

    /* =================================================
           MUSIC
        ================================================= */

    const musicButton = document.getElementById("musicBtn");

    const audio = document.getElementById("patrioticAudio");

    if (musicButton && audio) {
      musicButton.addEventListener("click", async function () {
        try {
          if (audio.paused) {
            await audio.play();

            musicButton.textContent = "⏸ Pause Music";
          } else {
            audio.pause();

            musicButton.textContent = "🔊 Play Music";
          }
        } catch (error) {
          console.warn("Audio playback failed:", error);
        }
      });
    }
  });

  /* =====================================================
       EXTRA LOADER SAFETY
    ===================================================== */

  window.addEventListener("load", function () {
    hideLoader();

    setTimeout(hideLoader, 500);
  });

  /*
       अंतिम fallback:
       अगर किसी कारण से load event भी miss हो जाए,
       तो DOM ready के बाद loader जरूर हटेगा.
    */

  setTimeout(function () {
    hideLoader();
  }, 3000);
})();
