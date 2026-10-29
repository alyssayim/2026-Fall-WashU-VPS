const lines = [
    "Hello.",
    "Are you the doctor?",
    "Three people died, but it's dead now.",
    "Here's what's left of the remains..."
];

const text = document.getElementById("text");
const screen = document.getElementById("screen");

let lineIndex = 0;
let typing = false;

function typeText(message) {
    text.textContent = "";
    typing = true;

    let charIndex = 0;

    const interval = setInterval(() => {
        text.textContent += message[charIndex];
        charIndex++;

        if (charIndex >= message.length) {
            clearInterval(interval);
            typing = false;
        }
    }, 60);
}

screen.addEventListener("click", () => {
    if (typing) return;

    if (lineIndex < lines.length) {
        typeText(lines[lineIndex]);
        lineIndex++;
    } else {
        text.style.display = "none";
        gallery.style.display = "block";
    }
});

const gallery = document.getElementById("gallery");

const imageScreen = document.getElementById("image-screen");
const selectedImage = document.getElementById("selected-image");

document.querySelectorAll("#gallery img").forEach(image => {
    image.addEventListener("click", (event) => {
        event.stopPropagation();

        selectedImage.src = image.dataset.next;

        gallery.style.display = "none";
        imageScreen.style.display = "flex";
    });
});

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", (event) => {
    event.stopPropagation();

    imageScreen.style.display = "none";
    selectedImage.removeAttribute("src");
    gallery.style.display = "block";
});

