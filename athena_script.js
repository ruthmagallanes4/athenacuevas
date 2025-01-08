const imageFolder = "Athe";
const startImage = 40;
const numImages = 29;

const grid = document.getElementById("grid");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const likeButton = document.getElementById("likeButton");
const loadedImages = new Set();

loadImages(imageFolder, startImage, numImages);

function loadImages(imageFolder, startImage, numImages) {
    for (let i = startImage; i < startImage + numImages; i++) {
        const baseFilename = i.toString();
        if (loadedImages.has(baseFilename)) continue;

        const card = document.createElement("div");
        card.className = "card";
        let loaded = false;

        const extensions = [".jpeg", ".jpg", ".jfif"];

        for (const ext of extensions) {
            const img = new Image();
            img.alt = `Image ${i}`;
            img.onload = function() {
                if (!loaded) {
                    card.appendChild(this);
                    grid.appendChild(card);
                    loadedImages.add(baseFilename);
                    loaded = true;
                    card.addEventListener("click", () => {
                        modalImage.src = this.src;
                        modal.style.display = "flex";
                    });
                }
            };
            img.onerror = function() {
                console.error("Error loading:", this.src);
            };
            img.src = `${imageFolder}/${i}${ext}`;
            if (loaded) break;
        }
    }
}

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

likeButton.addEventListener("click", () => {
    const animation = document.createElement("span");
    animation.classList.add("like-animation");
    animation.innerHTML = "❤️";

    likeButton.appendChild(animation);

    animation.addEventListener("animationend", () => {
        animation.remove();
    });

    likeButton.classList.toggle("liked");
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        document.body.classList.add('show-coming-soon');
    } else {
        document.body.classList.remove('show-coming-soon');
    }
});