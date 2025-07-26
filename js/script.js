// 👉 Preloader hide on page load
var loader = document.getElementById("preloader");
window.addEventListener("load", () => {
  loader.style.display = "none";
});

//👉 Dark/Light Mode
let Mode = document.querySelector(".bx-moon");
let Mode2 = document.querySelector(".bx-sun");
let Mode3 = document.querySelector("video");
Mode2.onclick = function () {
  document.body.classList.toggle("mode");
  if (document.body.classList.contains("mode")) {
    Mode3.src = "./assets/bg-video.mp4";
    // Mode.classList.replace("bx-moon", "bx-sun");
    // mode = <i class="bx bx-sun" id="icon"></i>;
  } else {
    Mode3.src = "./assets/bg-video2.mp4";
    // Mode.classList.replace("bx-sun", "bx-moon");
    // mode = <i class="bx bx-moon" id="icon" id="moon"></i>;
  }
};

// 👉 Animated Counter (for Experience, Satisfaction, etc.)
const counters = document.querySelectorAll(".stat-number");

counters.forEach((counter) => {
  const target = +counter.getAttribute("data-target"); // Convert target to number
  const symbol = counter.getAttribute("data-symbol") || ""; // Optional symbol (like %, +)
  let count = 0;

  const updateCounter = () => {
    const increment = target / 200; // Smaller = slower animation

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count) + symbol; // Round up & show symbol
      requestAnimationFrame(updateCounter); // Smooth animation
    } else {
      counter.innerText = target + symbol; // Final value set
    }
  };

  updateCounter(); // Start animation
});

// 👉 Typing Effect (Freelancer | Web Dev | Designer)
const profession = ["Freelancer", "Web Developer", "Web Designer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = profession[index];
  const display = currentText.substring(0, charIndex);
  document.getElementById("profession").innerText = display;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeEffect, 100); // Typing speed
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50); // Deleting speed
  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      index = (index + 1) % profession.length; // Move to next title
    }

    setTimeout(typeEffect, 1000); // Pause before typing again
  }
}

typeEffect(); // Start typing effect

// 👉 Name slider (like text carousel)
const texts = [
  "Khansa Ehsan",
  "Frontend Developer",
  "Backend Developer",
  "SEO Expert",
];

let i = 0;
const textEl = document.getElementById("name-slide");

function slideText() {
  textEl.style.transform = "translateY(-100%)";

  setTimeout(() => {
    textEl.innerText = texts[i];
    textEl.style.transform = "translateY(0)";
    i = (i + 1) % texts.length;
  }, 500);
}

setInterval(slideText, 2000); // Change text every 2 seconds
//👉 Progress bar dynamic

// Wait until page is loaded
window.addEventListener("load", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach((bar) => {
    const percent = bar.getAttribute("data-percent");
    bar.style.width = percent + "%";
  });
});

// 👉 animations on scroll

const animatedElements = document.querySelectorAll(".tool-1");

const observer = new IntersectionObserver(
  //   IntersectionObserver → Browser ka built-in API jo detect karta hai:
  // "Kya koi element viewport (screen) mein enter hua ya nahi?"

  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("show"); // reset
        // offsetwidth DOM (Document Object Model) ka read-only property hai jo element ki width (pixels) return karta hai:

        void entry.target.offsetWidth; // reflow trick 🔁  = Layout calculation dubara karo

        entry.target.classList.add("show"); // animation restart
      }
    });
  },
  {
    //     | Value | Meaning                                           |
    // | ----- | ------------------------------------------------- |
    // | `0`   | Jaise hi koi pixel screen pe aaye, trigger ho jao |
    // | `0.2` | Jab 20% element visible ho, tab trigger ho        |
    // | `1`   | Jab 100% element dikh raha ho tab trigger ho      |

    threshold: 0.2,
  }
);

animatedElements.forEach((el) => observer.observe(el));
