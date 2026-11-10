
const lines = [
    "Hello.",
    "Are you the doctor?",
    "Three people died...",
    "But it's dead now.",
    "Here's what's left of the remains."
];

const textElement = document.getElementById("typewriter-text");
const introLayer = document.getElementById("intro-layer");
const galleryLayer = document.getElementById("gallery-layer");
const background = document.getElementById("background");
const bgAudio = document.getElementById("bg-audio");
const clickAudio = document.getElementById("click-audio");
const overlay = document.getElementById("fullscreen-overlay");
const fullImage = document.getElementById("full-image");
const closeBtn = document.getElementById("close-btn");
const floatImages = document.querySelectorAll(".float-img");

let lineIndex = 0;
let isTyping = false;

function typeLine(text) {
    isTyping = true;
    textElement.textContent = "";

    let charIndex = 0;

    const interval = setInterval(() => {
        textElement.textContent += text[charIndex];
        charIndex++;

        if (charIndex === text.length) {
            clearInterval(interval);
            isTyping = false;
        }
    }, 50);
}

typeLine(lines[0]);

introLayer.addEventListener("click", () => {
    if (isTyping) return;

    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});

    lineIndex++;

    if (lineIndex < lines.length) {
        typeLine(lines[lineIndex]);
    } else {
        startGallery();
    }
});

function startGallery() {
    introLayer.style.opacity = "0";
    introLayer.style.pointerEvents = "none";

    setTimeout(() => {
        introLayer.style.display = "none";
        galleryLayer.style.display = "block";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                background.classList.add("visible");
                galleryLayer.classList.add("visible");
            });
        });

        bgAudio.volume = 0.3;
        bgAudio.play().catch(() => {});
    }, 1000);
}

floatImages.forEach(img => {
    const originalSrc = img.getAttribute("src");
    const hoverSrc = img.dataset.hover;

    img.addEventListener("mouseenter", () => {
        img.src = hoverSrc;
    });

    img.addEventListener("mouseleave", () => {
        img.src = originalSrc;
    });

    img.addEventListener("click", () => {
        fullImage.src = img.dataset.full;
        overlay.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    fullImage.src = "";
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        overlay.style.display = "none";
        fullImage.src = "";
    }
});
